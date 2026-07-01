/**
 * STATECRAFT — Core Game Engine
 * Manages game state, turn flow, and win conditions.
 */

const Game = {
  state: null,

  /**
   * Initialize a new game
   */
  init(mode) {
    this.state = {
      mode: mode, // 'ai' or 'human'
      round: 1,
      maxRounds: 20,
      currentPlayer: 1, // 1 or 2
      phase: 'event', // 'event', 'action', 'resolution', 'economy'
      tension: 30,
      gameOver: false,
      winner: null,
      players: {
        1: this.createPlayer('Player 1'),
        2: this.createPlayer(mode === 'ai' ? 'AI Opponent' : 'Player 2')
      },
      log: [],
      pendingPromises: { 1: [], 2: [] },
      lastEvent: null
    };

    this.log('system', `Game started. Mode: ${mode === 'ai' ? 'vs AI' : '2-Player'}. Global Tension: ${this.state.tension}`);
    return this.state;
  },

  /**
   * Create a new player with starting stats
   */
  createPlayer(name) {
    return {
      name: name,
      influence: 25,
      economy: 50,
      military: 40,
      stability: 60,
      reputation: 50
    };
  },

  /**
   * Clamp a stat between 0 and 100
   */
  clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  },

  /**
   * Apply stat changes to a player
   */
  applyEffects(playerNum, effects) {
    const player = this.state.players[playerNum];
    for (const [stat, delta] of Object.entries(effects)) {
      if (stat === 'reveal') continue; // Special: handled by UI
      if (player[stat] !== undefined) {
        player[stat] = this.clamp(player[stat] + delta);
      }
    }
  },

  /**
   * Execute the Event Phase — fire a random world event
   */
  executeEventPhase() {
    const event = getRandomEvent(this.state.tension);
    this.state.lastEvent = event;

    // Apply event effects
    if (event.effects.both) {
      this.applyEffects(1, event.effects.both);
      this.applyEffects(2, event.effects.both);
    }
    if (event.effects.player1) {
      this.applyEffects(1, event.effects.player1);
    }
    if (event.effects.player2) {
      this.applyEffects(2, event.effects.player2);
    }

    // Adjust tension
    this.state.tension = this.clamp(this.state.tension + event.tensionChange);

    this.log('event', `[${event.sector}] ${event.title}: ${event.text}`);
    this.state.phase = 'action';

    this.checkWinConditions();
    return event;
  },

  /**
   * Execute a player's move
   */
  executeMove(playerNum, moveId) {
    const move = getMoveById(moveId);
    const player = this.state.players[playerNum];
    const opponentNum = playerNum === 1 ? 2 : 1;

    if (!move) return { success: false, reason: 'Move not found' };
    if (!canAffordMove(player, move)) return { success: false, reason: 'Cannot afford this move' };

    // Apply costs
    if (move.costs) {
      for (const [stat, cost] of Object.entries(move.costs)) {
        player[stat] = this.clamp(player[stat] + cost);
      }
    }

    // Apply self effects
    if (move.effects.self) {
      this.applyEffects(playerNum, move.effects.self);
    }

    // Apply opponent effects
    if (move.effects.opponent) {
      this.applyEffects(opponentNum, move.effects.opponent);
    }

    // Goldstein affects tension
    const tensionDelta = move.goldstein > 0 ? -Math.round(move.goldstein / 2) : -Math.round(move.goldstein / 2);
    this.state.tension = this.clamp(this.state.tension - Math.round(move.goldstein * 0.8));

    // Track promises
    if (move.id === 'promise') {
      this.state.pendingPromises[playerNum].push({
        round: this.state.round,
        expiresRound: this.state.round + 3
      });
    }

    const logCategory = move.category;
    this.log(logCategory, `${player.name} executes: ${move.name} (IDEA ${move.ideaCode})`);

    this.state.phase = 'economy';
    this.checkWinConditions();

    return { success: true, move };
  },

  /**
   * Execute Economy Phase — passive income and promise resolution
   */
  executeEconomyPhase() {
    // Passive economy regeneration (small)
    for (const pNum of [1, 2]) {
      const p = this.state.players[pNum];
      // Economy generates +2 per turn if healthy
      if (p.economy > 30) {
        p.economy = this.clamp(p.economy + 1);
      }
      // Military costs maintenance
      if (p.military > 60) {
        p.economy = this.clamp(p.economy - 1);
      }
      // High reputation generates passive influence
      if (p.reputation > 70) {
        p.influence = this.clamp(p.influence + 1);
      }
      // Low stability degrades everything slowly
      if (p.stability < 20) {
        p.economy = this.clamp(p.economy - 2);
        p.influence = this.clamp(p.influence - 1);
      }

      // Check broken promises
      const expired = this.state.pendingPromises[pNum].filter(
        pr => pr.expiresRound <= this.state.round
      );
      if (expired.length > 0) {
        // Each unfulfilled promise costs reputation
        for (const pr of expired) {
          p.reputation = this.clamp(p.reputation - 10);
          this.log('system', `${p.name}'s unfulfilled promise damages reputation (-10)`);
        }
        this.state.pendingPromises[pNum] = this.state.pendingPromises[pNum].filter(
          pr => pr.expiresRound > this.state.round
        );
      }
    }

    this.checkWinConditions();
  },

  /**
   * Advance to next player's turn or next round
   */
  advanceTurn() {
    if (this.state.gameOver) return;

    if (this.state.currentPlayer === 1) {
      // Player 2's turn
      this.state.currentPlayer = 2;
      this.state.phase = 'action';
    } else {
      // End of round — economy phase then new round
      this.executeEconomyPhase();
      this.state.round++;
      this.state.currentPlayer = 1;
      this.state.phase = 'event';

      if (this.state.round > this.state.maxRounds) {
        this.endGame();
      }
    }
  },

  /**
   * Check if game-ending conditions are met
   */
  checkWinConditions() {
    const p1 = this.state.players[1];
    const p2 = this.state.players[2];

    // Win by Influence
    if (p1.influence >= 75) {
      this.state.gameOver = true;
      this.state.winner = 1;
      this.state.winReason = `${p1.name} achieved diplomatic supremacy (75 Influence)`;
    } else if (p2.influence >= 75) {
      this.state.gameOver = true;
      this.state.winner = 2;
      this.state.winReason = `${p2.name} achieved diplomatic supremacy (75 Influence)`;
    }

    // Win by Collapse
    if (p1.stability <= 0) {
      this.state.gameOver = true;
      this.state.winner = 2;
      this.state.winReason = `${p1.name}'s government collapsed (Stability reached 0)`;
    } else if (p2.stability <= 0) {
      this.state.gameOver = true;
      this.state.winner = 1;
      this.state.winReason = `${p2.name}'s government collapsed (Stability reached 0)`;
    }
  },

  /**
   * End game after max rounds — highest Influence wins
   */
  endGame() {
    const p1 = this.state.players[1];
    const p2 = this.state.players[2];

    this.state.gameOver = true;
    if (p1.influence > p2.influence) {
      this.state.winner = 1;
      this.state.winReason = `${p1.name} wins by Influence (${p1.influence} vs ${p2.influence}) after ${this.state.maxRounds} rounds`;
    } else if (p2.influence > p1.influence) {
      this.state.winner = 2;
      this.state.winReason = `${p2.name} wins by Influence (${p2.influence} vs ${p1.influence}) after ${this.state.maxRounds} rounds`;
    } else {
      // Tie: compare total stats
      const p1Total = p1.influence + p1.economy + p1.military + p1.stability + p1.reputation;
      const p2Total = p2.influence + p2.economy + p2.military + p2.stability + p2.reputation;
      this.state.winner = p1Total >= p2Total ? 1 : 2;
      this.state.winReason = `Tie broken by total national power after ${this.state.maxRounds} rounds`;
    }
  },

  /**
   * Add entry to game log
   */
  log(category, message) {
    this.state.log.push({
      round: this.state.round,
      category,
      message,
      timestamp: Date.now()
    });
  },

  /**
   * AI takes its turn
   */
  executeAITurn() {
    const aiPlayer = this.state.players[2];
    const humanPlayer = this.state.players[1];
    const move = AI.selectMove(aiPlayer, humanPlayer, this.state.tension);
    return this.executeMove(2, move.id);
  }
};
