/**
 * STATECRAFT — UI Controller
 * Handles all DOM interactions, screen transitions, and rendering.
 */

const UI = {
  currentCategory: 'cooperative',
  selectedMove: null,

  /**
   * Initialize UI bindings
   */
  init() {
    // Start screen buttons
    document.getElementById('btn-vs-ai').addEventListener('click', () => this.startGame('ai'));
    document.getElementById('btn-vs-human').addEventListener('click', () => this.startGame('human'));
    document.getElementById('btn-how-to-play').addEventListener('click', (e) => {
      e.preventDefault();
      this.showScreen('how-to-play-screen');
    });
    document.getElementById('btn-back-to-start').addEventListener('click', () => this.showScreen('start-screen'));
    document.getElementById('btn-play-again').addEventListener('click', () => this.showScreen('start-screen'));

    // Event banner dismiss
    document.getElementById('btn-dismiss-event').addEventListener('click', () => this.dismissEvent());

    // Move category tabs
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchCategory(tab.dataset.category));
    });

    // Move detail buttons
    document.getElementById('btn-confirm-move').addEventListener('click', () => this.confirmMove());
    document.getElementById('btn-cancel-move').addEventListener('click', () => this.cancelMoveSelection());
  },

  /**
   * Switch active screen
   */
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
  },

  /**
   * Start a new game
   */
  startGame(mode) {
    Game.init(mode);
    this.showScreen('game-screen');
    this.updateAllStats();
    this.updateHeader();
    this.clearLog();
    this.addLogEntry('system', 'Game started. Global Tension: 30');

    // Begin first turn's event phase
    this.runEventPhase();
  },

  /**
   * Run the event phase
   */
  runEventPhase() {
    if (Game.state.gameOver) { this.showGameOver(); return; }

    const event = Game.executeEventPhase();
    this.showEventBanner(event);
    this.updateAllStats();
    this.updateHeader();
  },

  /**
   * Show the event banner
   */
  showEventBanner(event) {
    const banner = document.getElementById('event-banner');
    document.getElementById('event-sector').textContent = event.sector.toUpperCase();
    document.getElementById('event-risk').textContent = event.riskType + ' Risk';
    document.getElementById('event-text').textContent = event.text;

    // Format effects
    let effectText = '';
    if (event.effects.both) {
      const parts = [];
      for (const [stat, val] of Object.entries(event.effects.both)) {
        parts.push(`${stat.charAt(0).toUpperCase() + stat.slice(1)} ${val > 0 ? '+' : ''}${val}`);
      }
      effectText = `Both players: ${parts.join(', ')}`;
    }
    document.getElementById('event-effect').textContent = effectText;

    // Color the sector badge by severity
    const sectorEl = document.getElementById('event-sector');
    sectorEl.style.background = event.severity === 'positive' ? 'var(--accent-green)' :
                                 event.severity === 'severe' ? 'var(--accent-red)' :
                                 'var(--accent-orange)';

    banner.classList.remove('hidden');
    document.getElementById('move-panel').classList.add('hidden');
    document.getElementById('move-detail').classList.add('hidden');

    this.addLogEntry('event', `[${event.sector}] ${event.title}`);
  },

  /**
   * Dismiss event banner and show move panel
   */
  dismissEvent() {
    document.getElementById('event-banner').classList.add('hidden');

    if (Game.state.gameOver) { this.showGameOver(); return; }

    // Show move panel for current player
    this.showMovePanel();
  },

  /**
   * Show the move selection panel
   */
  showMovePanel() {
    const panel = document.getElementById('move-panel');
    const currentPlayer = Game.state.currentPlayer;
    const playerName = Game.state.players[currentPlayer].name;

    document.getElementById('move-panel-title').textContent = `${playerName} — Choose Your Move`;
    panel.classList.remove('hidden');
    document.getElementById('move-detail').classList.add('hidden');

    this.switchCategory(this.currentCategory);
  },

  /**
   * Switch move category tab
   */
  switchCategory(category) {
    this.currentCategory = category;

    // Update tab styles
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[data-category="${category}"]`).classList.add('active');

    // Render moves
    const moves = getMovesByCategory(category);
    const player = Game.state.players[Game.state.currentPlayer];
    const list = document.getElementById('move-list');
    list.innerHTML = '';

    for (const move of moves) {
      const affordable = canAffordMove(player, move);
      const card = document.createElement('div');
      card.className = `move-card ${affordable ? '' : 'disabled'}`;
      card.innerHTML = `
        <div class="move-card-name">${move.name}</div>
        <div class="move-card-code">IDEA ${move.ideaCode} | Goldstein: ${move.goldstein > 0 ? '+' : ''}${move.goldstein}</div>
        <div class="move-card-summary">${this.truncate(move.description, 80)}</div>
      `;

      if (affordable) {
        card.addEventListener('click', () => this.selectMove(move));
      }

      list.appendChild(card);
    }
  },

  /**
   * Show move detail panel
   */
  selectMove(move) {
    this.selectedMove = move;
    const detail = document.getElementById('move-detail');
    const player = Game.state.players[Game.state.currentPlayer];

    document.getElementById('detail-name').textContent = move.name;
    document.getElementById('detail-description').textContent = move.description;
    document.getElementById('detail-code').textContent = `IDEA Code: ${move.ideaCode}`;

    const goldsteinEl = document.getElementById('detail-goldstein');
    goldsteinEl.textContent = `Goldstein: ${move.goldstein > 0 ? '+' : ''}${move.goldstein}`;
    goldsteinEl.className = `detail-goldstein ${move.goldstein > 0 ? 'positive' : move.goldstein < 0 ? 'negative' : 'neutral'}`;

    document.getElementById('detail-example').textContent = move.example;
    document.getElementById('detail-tip').textContent = `Strategy: ${move.tip}`;

    // Render effect chips
    const effectsEl = document.getElementById('detail-effects');
    effectsEl.innerHTML = '';

    if (move.costs) {
      for (const [stat, val] of Object.entries(move.costs)) {
        const chip = document.createElement('span');
        chip.className = 'effect-chip negative';
        chip.textContent = `Cost: ${stat} ${val}`;
        effectsEl.appendChild(chip);
      }
    }
    if (move.effects.self) {
      for (const [stat, val] of Object.entries(move.effects.self)) {
        if (stat === 'reveal') continue;
        const chip = document.createElement('span');
        chip.className = `effect-chip ${val > 0 ? 'positive' : 'negative'}`;
        chip.textContent = `Self: ${stat} ${val > 0 ? '+' : ''}${val}`;
        effectsEl.appendChild(chip);
      }
    }
    if (move.effects.opponent) {
      for (const [stat, val] of Object.entries(move.effects.opponent)) {
        const chip = document.createElement('span');
        chip.className = `effect-chip ${val > 0 ? 'positive' : 'negative'}`;
        chip.textContent = `Opponent: ${stat} ${val > 0 ? '+' : ''}${val}`;
        effectsEl.appendChild(chip);
      }
    }

    document.getElementById('move-panel').classList.add('hidden');
    detail.classList.remove('hidden');
  },

  /**
   * Cancel move selection and go back to move list
   */
  cancelMoveSelection() {
    this.selectedMove = null;
    document.getElementById('move-detail').classList.add('hidden');
    this.showMovePanel();
  },

  /**
   * Confirm and execute the selected move
   */
  confirmMove() {
    if (!this.selectedMove) return;

    const result = Game.executeMove(Game.state.currentPlayer, this.selectedMove.id);

    if (!result.success) {
      alert(result.reason);
      return;
    }

    this.addLogEntry(this.selectedMove.category,
      `${Game.state.players[Game.state.currentPlayer].name}: ${this.selectedMove.name} (IDEA ${this.selectedMove.ideaCode})`
    );

    this.selectedMove = null;
    document.getElementById('move-detail').classList.add('hidden');
    this.updateAllStats();
    this.updateHeader();

    if (Game.state.gameOver) { this.showGameOver(); return; }

    // Advance turn
    Game.advanceTurn();

    if (Game.state.gameOver) { this.showGameOver(); return; }

    // If it's now Player 2's turn
    if (Game.state.currentPlayer === 2) {
      if (Game.state.mode === 'ai') {
        // AI plays after a brief delay
        setTimeout(() => this.executeAITurn(), 800);
      } else {
        // Human player 2
        this.showMovePanel();
      }
    } else {
      // New round — run event phase
      this.runEventPhase();
    }
  },

  /**
   * Execute AI turn
   */
  executeAITurn() {
    if (Game.state.gameOver) { this.showGameOver(); return; }

    const result = Game.executeAITurn();

    if (result.success) {
      this.addLogEntry(result.move.category,
        `${Game.state.players[2].name}: ${result.move.name} (IDEA ${result.move.ideaCode})`
      );
    }

    this.updateAllStats();
    this.updateHeader();

    if (Game.state.gameOver) { this.showGameOver(); return; }

    // Advance to next round
    Game.advanceTurn();

    if (Game.state.gameOver) { this.showGameOver(); return; }

    // New round event phase
    setTimeout(() => this.runEventPhase(), 600);
  },

  /**
   * Update all player stat displays
   */
  updateAllStats() {
    for (const pNum of [1, 2]) {
      const p = Game.state.players[pNum];
      const prefix = `p${pNum}`;

      for (const stat of ['influence', 'economy', 'military', 'stability', 'reputation']) {
        const val = p[stat];
        document.getElementById(`${prefix}-${stat}`).textContent = val;
        document.getElementById(`${prefix}-${stat}-bar`).style.width = `${val}%`;
      }

      document.getElementById(`${prefix}-name`).textContent = p.name;
    }
  },

  /**
   * Update header (tension bar, round)
   */
  updateHeader() {
    const tension = Game.state.tension;
    document.getElementById('tension-fill').style.width = `${tension}%`;
    document.getElementById('tension-value').textContent = tension;
    document.getElementById('round-display').textContent = `Round ${Game.state.round} / ${Game.state.maxRounds}`;
  },

  /**
   * Show game over screen
   */
  showGameOver() {
    const winner = Game.state.players[Game.state.winner];
    const loser = Game.state.players[Game.state.winner === 1 ? 2 : 1];

    document.getElementById('gameover-title').textContent = `${winner.name} Wins!`;
    document.getElementById('gameover-message').textContent = Game.state.winReason;

    const statsHtml = `
      <strong>${winner.name} (Winner)</strong><br>
      Influence: ${winner.influence} | Economy: ${winner.economy} | Military: ${winner.military}<br>
      Stability: ${winner.stability} | Reputation: ${winner.reputation}<br><br>
      <strong>${loser.name}</strong><br>
      Influence: ${loser.influence} | Economy: ${loser.economy} | Military: ${loser.military}<br>
      Stability: ${loser.stability} | Reputation: ${loser.reputation}<br><br>
      <strong>Final Global Tension:</strong> ${Game.state.tension}<br>
      <strong>Rounds Played:</strong> ${Game.state.round - 1}
    `;
    document.getElementById('gameover-stats').innerHTML = statsHtml;

    this.showScreen('gameover-screen');
  },

  /**
   * Add entry to visual log
   */
  addLogEntry(category, message) {
    const list = document.getElementById('log-list');
    const li = document.createElement('li');
    li.className = `log-entry log-${category}`;
    li.textContent = `[R${Game.state.round}] ${message}`;
    list.insertBefore(li, list.firstChild);

    // Keep log reasonable
    while (list.children.length > 50) {
      list.removeChild(list.lastChild);
    }
  },

  /**
   * Clear the log
   */
  clearLog() {
    document.getElementById('log-list').innerHTML = '';
  },

  /**
   * Truncate text
   */
  truncate(text, max) {
    return text.length > max ? text.substring(0, max) + '...' : text;
  }
};

// Boot the UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => UI.init());
