/**
 * STATECRAFT — AI Opponent
 * Simple heuristic AI that selects moves based on game state.
 */

const AI = {
  /**
   * Select a move for the AI player.
   * Strategy: assess current state and pick the best category, then best move.
   */
  selectMove(aiPlayer, humanPlayer, tension) {
    const allMoves = getAllMoves();
    const affordable = allMoves.filter(m => canAffordMove(aiPlayer, m));

    if (affordable.length === 0) {
      // Fallback: pick endorse (free move)
      return getMoveById('endorse');
    }

    // Determine strategic preference based on state
    const strategy = this.assessStrategy(aiPlayer, humanPlayer, tension);

    // Filter to preferred category
    let preferred = affordable.filter(m => m.category === strategy);
    if (preferred.length === 0) preferred = affordable;

    // Score each move
    const scored = preferred.map(move => ({
      move,
      score: this.scoreMove(move, aiPlayer, humanPlayer, tension)
    }));

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Add some randomness — pick from top 3
    const topN = scored.slice(0, Math.min(3, scored.length));
    return topN[Math.floor(Math.random() * topN.length)].move;
  },

  /**
   * Decide overall strategy preference
   */
  assessStrategy(ai, human, tension) {
    // If AI is ahead on influence — play defensive/cooperative
    if (ai.influence > human.influence + 15) return 'cooperative';

    // If AI is behind on influence — play aggressive/confrontational
    if (ai.influence < human.influence - 10) return 'confrontational';

    // If AI reputation is low — recover with cooperation
    if (ai.reputation < 30) return 'cooperative';

    // If opponent stability is low — go for the kill
    if (human.stability < 25) return 'confrontational';

    // If tension is very high — de-escalate
    if (tension > 70) return 'cooperative';

    // If tension is low — exploit with strategic moves
    if (tension < 25) return 'strategic';

    // Default: strategic
    return 'strategic';
  },

  /**
   * Score a single move based on how beneficial it is in context
   */
  scoreMove(move, ai, human, tension) {
    let score = 0;

    // Value Influence gains highest (path to victory)
    if (move.effects.self && move.effects.self.influence) {
      score += move.effects.self.influence * 2;
    }

    // Value Reputation if it's currently low
    if (move.effects.self && move.effects.self.reputation) {
      const repValue = ai.reputation < 40 ? 1.5 : 0.8;
      score += move.effects.self.reputation * repValue;
    }

    // Value opponent damage
    if (move.effects.opponent) {
      for (const [stat, val] of Object.entries(move.effects.opponent)) {
        score -= val * 0.8; // Negative values become positive score
      }
    }

    // Penalize self-damage
    if (move.effects.self) {
      if (move.effects.self.reputation && move.effects.self.reputation < 0) {
        score += move.effects.self.reputation * 0.5;
      }
    }

    // Penalize costs
    if (move.costs) {
      for (const [stat, cost] of Object.entries(move.costs)) {
        score += cost * 0.3; // Costs are negative, so this reduces score
      }
    }

    // Bonus for stabilizing moves when stability is low
    if (ai.stability < 35 && move.effects.self && move.effects.self.stability > 0) {
      score += move.effects.self.stability * 2;
    }

    // Bonus for force when opponent military is low
    if (move.id === 'force' && human.military < 20) {
      score += 10;
    }

    // Penalty for force when AI military is low
    if (move.id === 'force' && ai.military < 25) {
      score -= 15;
    }

    return score;
  }
};
