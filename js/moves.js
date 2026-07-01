/**
 * STATECRAFT — Move Definitions
 * Each move maps to a real IDEA event code with educational context.
 * Goldstein scores from the GDELT Goldstein Scale (-10 to +10).
 */

const MOVES = {
  cooperative: [
    {
      id: 'yield',
      name: 'Yield',
      ideaCode: '01',
      goldstein: 5.0,
      category: 'cooperative',
      costs: { economy: -5 },
      effects: { self: { reputation: 10 }, opponent: { reputation: 5 } },
      description: 'Concede a position, make a concession, or withdraw a claim to build goodwill and reduce tensions.',
      example: 'In 2015, Iran yielded on nuclear enrichment capacity in exchange for sanctions relief under the JCPOA.',
      tip: 'Use when your Reputation is low or Global Tension is dangerously high. Yields de-escalate but cost economic leverage.',
      realWorld: 'Yielding signals willingness to compromise. Nations yield when the cost of confrontation exceeds the value of the position held.'
    },
    {
      id: 'consult',
      name: 'Consult',
      ideaCode: '03',
      goldstein: 4.0,
      category: 'cooperative',
      costs: { economy: -3 },
      effects: { self: { influence: 5, reputation: 3 } },
      description: 'Engage in diplomatic discussions, host meetings, or travel to meet counterparts.',
      example: 'G7 summits are formal consultations where leaders align on shared challenges without binding commitments.',
      tip: 'Low cost, steady gains. Consulting builds Influence incrementally and is always a safe move.',
      realWorld: 'Consultation is the bedrock of diplomacy — creating channels of communication before crises escalate.'
    },
    {
      id: 'endorse',
      name: 'Endorse',
      ideaCode: '04',
      goldstein: 3.5,
      category: 'cooperative',
      costs: {},
      effects: { self: { reputation: 5, influence: 3 } },
      description: 'Publicly praise, support, or validate another actor\'s position or actions.',
      example: 'When the EU endorsed Ukraine\'s candidacy for membership, it signaled alignment without immediate material cost.',
      tip: 'Free move with no resource cost. Use to build Reputation when you can\'t afford expensive actions.',
      realWorld: 'Endorsements are political capital — they cost nothing material but create expectations of future alignment.'
    },
    {
      id: 'promise',
      name: 'Promise',
      ideaCode: '05',
      goldstein: 4.5,
      category: 'cooperative',
      costs: {},
      effects: { self: { influence: 8 } },
      unfulfilled_penalty: { self: { reputation: -15 } },
      description: 'Commit to a future action — policy support, material support, or humanitarian assistance.',
      example: 'NATO\'s promise of collective defense (Article 5) deters aggression through the credibility of commitment.',
      tip: 'High Influence gain but carries hidden risk — broken promises devastate Reputation in later rounds.',
      realWorld: 'Promises are leverage: they extend influence without immediate cost, but credibility depends on follow-through.'
    },
    {
      id: 'grant',
      name: 'Grant',
      ideaCode: '06',
      goldstein: 6.0,
      category: 'cooperative',
      costs: { economy: -10 },
      effects: { self: { reputation: 15, influence: 8 } },
      description: 'Provide aid, extend invitations, grant asylum, improve relations, or release prisoners.',
      example: 'The Marshall Plan granted massive economic aid to post-WWII Europe, building decades of American influence.',
      tip: 'Expensive but powerful. Grants are your strongest Reputation builder and create long-term alliances.',
      realWorld: 'Granting aid establishes patron-client relationships that generate loyalty and strategic positioning.'
    },
    {
      id: 'reward',
      name: 'Reward',
      ideaCode: '07',
      goldstein: 7.0,
      category: 'cooperative',
      costs: { economy: -8 },
      effects: { self: { influence: 10, reputation: 5 } },
      description: 'Extend economic aid, military aid, or humanitarian assistance to reinforce desired behavior.',
      example: 'US military aid to Israel functions as a strategic reward reinforcing alliance behavior.',
      tip: 'Best used after an opponent cooperates — rewarding cooperation encourages more of it.',
      realWorld: 'Rewards shape behavior through positive reinforcement, creating dependency and alignment over time.'
    },
    {
      id: 'agree',
      name: 'Agree',
      ideaCode: '08',
      goldstein: 6.5,
      category: 'cooperative',
      costs: {},
      effects: { self: { influence: 7, stability: 5 } },
      description: 'Sign a formal agreement, accept terms, or collaborate on joint initiatives.',
      example: 'The Paris Climate Agreement represents multilateral consensus — each signatory gains legitimacy from participation.',
      tip: 'Stabilizing move. Agreements boost both Influence and Stability with no direct cost.',
      realWorld: 'Formal agreements lock in gains and signal reliability to the international community.'
    },
    {
      id: 'cooperate',
      name: 'Cooperate',
      ideaCode: '30',
      goldstein: 7.5,
      category: 'cooperative',
      costs: { economy: -5 },
      effects: { self: { influence: 12, reputation: 8 } },
      description: 'Material cooperation — share intelligence, cooperate economically or militarily, engage in joint operations.',
      example: 'Five Eyes intelligence sharing represents deep material cooperation that multiplies each member\'s capabilities.',
      tip: 'Premium cooperative move. High returns but requires economic investment. Best when Economy is strong.',
      realWorld: 'Material cooperation goes beyond words — it\'s the tangible exchange of resources, information, or military assets.'
    }
  ],

  confrontational: [
    {
      id: 'reject',
      name: 'Reject',
      ideaCode: '11',
      goldstein: -4.0,
      category: 'confrontational',
      costs: {},
      effects: { self: { reputation: -5, stability: 3 } },
      description: 'Refuse a proposal, veto a resolution, defy norms, or refuse to yield.',
      example: 'Russia\'s UN Security Council vetoes reject Western resolutions, preserving sovereignty at reputational cost.',
      tip: 'Defensive move. Use when an opponent\'s proposal would weaken you. Costs Reputation but shores up Stability.',
      realWorld: 'Rejection asserts sovereignty and independence — the power to say no is fundamental to statecraft.'
    },
    {
      id: 'accuse',
      name: 'Accuse',
      ideaCode: '12',
      goldstein: -5.0,
      category: 'confrontational',
      costs: {},
      effects: { self: { reputation: -3 }, opponent: { reputation: -8 } },
      description: 'Publicly blame, criticize, denounce, or call out another actor for wrongdoing.',
      example: 'China accusing the US of hegemony at the UN shifts narrative framing and erodes opponent legitimacy.',
      tip: 'Targeted reputation attack. Damages opponent more than yourself — but both sides lose credibility.',
      realWorld: 'Accusations weaponize information and public opinion. Effective when backed by evidence; reckless without it.'
    },
    {
      id: 'demand',
      name: 'Demand',
      ideaCode: '15',
      goldstein: -6.0,
      category: 'confrontational',
      costs: { military: -2 },
      effects: { self: { influence: 5, reputation: -5 } },
      description: 'Insist on compliance — demand material cooperation, political reform, aid, or policy change.',
      example: 'US demands for NATO allies to meet 2% GDP defense spending pushed alliance burden-sharing debates.',
      tip: 'Gains Influence through assertiveness but costs Reputation. Back demands with Military strength.',
      realWorld: 'Demands signal resolve and set expectations. Unfulfilled demands without follow-up erode credibility.'
    },
    {
      id: 'warn',
      name: 'Warn',
      ideaCode: '16',
      goldstein: -4.0,
      category: 'confrontational',
      costs: { military: -3 },
      effects: { self: { reputation: -2 }, opponent: { stability: -5 } },
      description: 'Signal consequences — issue alerts, conduct military displays, or mobilize crowd control.',
      example: 'China\'s military exercises near Taiwan are warnings — signaling capability and willingness to act.',
      tip: 'Destabilizes opponent without full commitment. Good precursor to stronger moves.',
      realWorld: 'Warnings calibrate escalation — they communicate intent without irreversible action.'
    },
    {
      id: 'threaten',
      name: 'Threaten',
      ideaCode: '17',
      goldstein: -7.0,
      category: 'confrontational',
      costs: { military: -5 },
      effects: { self: { reputation: -5 }, opponent: { stability: -10 } },
      description: 'Direct threats of force — sanctions threats, military force threats, ultimatums.',
      example: 'Kennedy\'s naval quarantine during the Cuban Missile Crisis was a threat backed by visible military force.',
      tip: 'Powerful destabilizer. Most effective when your Military is high and opponent Stability is already shaky.',
      realWorld: 'Threats must be credible to work. Empty threats destroy reputation faster than any cooperative failure.'
    },
    {
      id: 'sanction',
      name: 'Sanction',
      ideaCode: '19',
      goldstein: -6.5,
      category: 'confrontational',
      costs: { economy: -5 },
      effects: { self: { reputation: -3 }, opponent: { economy: -10 } },
      description: 'Impose economic restrictions — trade sanctions, boycotts, embargoes, or financial freezes.',
      example: 'Western sanctions on Russia after 2022 targeted banking, energy, and technology sectors simultaneously.',
      tip: 'Economic warfare. Damages opponent Economy heavily but costs your own. Best with strong Economy.',
      realWorld: 'Sanctions are coercion without kinetic force — they impose costs to change behavior, but often hurt both sides.'
    },
    {
      id: 'expel',
      name: 'Expel',
      ideaCode: '20',
      goldstein: -7.0,
      category: 'confrontational',
      costs: { stability: -3 },
      effects: { self: { reputation: -5 }, opponent: { influence: -5 } },
      description: 'Remove diplomats, withdraw peacekeepers, expel inspectors, or eject aid agencies.',
      example: 'Russia expelling British diplomats after the Skripal poisoning severed diplomatic channels entirely.',
      tip: 'Cuts opponent Influence but destabilizes your own position. Use when isolating an adversary.',
      realWorld: 'Expulsion severs connections — it\'s a statement that communication has broken down and escalation is possible.'
    },
    {
      id: 'seize',
      name: 'Seize',
      ideaCode: '21',
      goldstein: -9.0,
      category: 'confrontational',
      costs: { military: -8 },
      effects: { self: { reputation: -10 }, opponent: { economy: -15 } },
      description: 'Take possession by force — arrest and detention, military seizure, border violations, occupation.',
      example: 'Russia\'s seizure of Crimea in 2014 took territory but triggered massive international reputation damage.',
      tip: 'High-impact aggressive move. Devastating to opponent Economy but destroys your Reputation. Last resort.',
      realWorld: 'Seizure violates sovereignty — the most fundamental norm. It gains assets but unites opposition against you.'
    },
    {
      id: 'force',
      name: 'Use Force',
      ideaCode: '22',
      goldstein: -10.0,
      category: 'confrontational',
      costs: { military: -15, economy: -10 },
      effects: { self: { reputation: -15 }, opponent: { military: -20 } },
      description: 'Military engagement — bombings, physical assault, military operations, coups.',
      example: 'The US invasion of Iraq in 2003 achieved military objectives but at enormous economic and reputational cost.',
      tip: 'The nuclear option. Maximum damage to opponent Military but devastating self-costs. Only when survival demands it.',
      realWorld: 'Force is the ultimate failure of diplomacy. It solves immediate threats but creates long-term instability.'
    }
  ],

  strategic: [
    {
      id: 'propose',
      name: 'Propose',
      ideaCode: '10',
      goldstein: 2.5,
      category: 'strategic',
      costs: {},
      effects: { self: { influence: 3 } },
      description: 'Offer a peace proposal, call for action, or introduce a resolution for consideration.',
      example: 'France proposing a UN resolution creates a framework others must respond to — framing the debate is power.',
      tip: 'Low-cost positioning move. Sets up future Agreements which have larger payoffs.',
      realWorld: 'Proposals control the agenda. The actor who defines the terms of debate holds structural power.'
    },
    {
      id: 'demonstrate',
      name: 'Demonstrate',
      ideaCode: '18',
      goldstein: -3.0,
      category: 'strategic',
      costs: { stability: -5 },
      effects: { self: { influence: 8 }, opponent: { stability: -3 } },
      description: 'Show of force or popular protest — military mobilization, protest demonstrations, symbolic acts.',
      example: 'Mass protests in Hong Kong demonstrated popular will, gaining international attention at domestic stability cost.',
      tip: 'Trades Stability for Influence. Powerful when Stability is high and you need a visibility boost.',
      realWorld: 'Demonstrations project power outward while revealing internal dynamics — strength and vulnerability simultaneously.'
    },
    {
      id: 'vote',
      name: 'Vote / Elect',
      ideaCode: '25',
      goldstein: 3.0,
      category: 'strategic',
      costs: {},
      effects: { self: { influence: 5, stability: 3 } },
      description: 'Participate in institutional voting, hold elections, or exercise democratic processes.',
      example: 'UN General Assembly votes on resolutions signal global consensus even without binding force.',
      tip: 'Free stabilizing move. Boosts both Influence and Stability through institutional legitimacy.',
      realWorld: 'Voting channels conflict into institutions. It legitimizes outcomes and distributes political costs.'
    },
    {
      id: 'negotiate',
      name: 'Negotiate',
      ideaCode: '54',
      goldstein: 4.0,
      category: 'strategic',
      costs: { economy: -3 },
      effects: { self: { influence: 10 } },
      description: 'Enter formal negotiations — structured talks aimed at reaching binding agreement.',
      example: 'The Camp David Accords required sustained negotiation that yielded lasting peace between Egypt and Israel.',
      tip: 'High Influence return for moderate cost. The premier diplomatic tool for converting Economy into political gains.',
      realWorld: 'Negotiation is where interests meet. Success requires understanding both your own and your opponent\'s positions.'
    },
    {
      id: 'investigate',
      name: 'Investigate',
      ideaCode: '33',
      goldstein: -2.0,
      category: 'strategic',
      costs: { economy: -5 },
      effects: { self: { influence: 3 }, reveal: true },
      description: 'Gather intelligence — investigate corruption, human rights abuses, military actions, or war crimes.',
      example: 'The IAEA investigating Iran\'s nuclear program provided intelligence that shaped global policy decisions.',
      tip: 'Reveals opponent\'s hidden stats. Valuable when you need information to plan your next major move.',
      realWorld: 'Investigation is intelligence — knowing the truth of a situation enables better strategic decisions.'
    }
  ]
};

/**
 * Get all moves as a flat array
 */
function getAllMoves() {
  return [...MOVES.cooperative, ...MOVES.confrontational, ...MOVES.strategic];
}

/**
 * Get moves by category
 */
function getMovesByCategory(category) {
  return MOVES[category] || [];
}

/**
 * Find a move by ID
 */
function getMoveById(id) {
  return getAllMoves().find(m => m.id === id);
}

/**
 * Check if a player can afford a move
 */
function canAffordMove(player, move) {
  if (!move.costs) return true;
  for (const [stat, cost] of Object.entries(move.costs)) {
    if (player[stat] + cost < 0) return false;
  }
  return true;
}
