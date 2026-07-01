/**
 * STATECRAFT — World Event System
 * Random events drawn from GICS sector categories and Risk types.
 * Events fire at the start of each round, affecting both players.
 */

const WORLD_EVENTS = [
  // === ENERGY (GICS 10) ===
  {
    id: 'oil_disruption',
    sector: 'Energy',
    sectorCode: 10,
    riskType: 'Fuel Price',
    riskId: 23,
    title: 'Pipeline Disruption',
    text: 'A major oil pipeline in a contested region is sabotaged, sending energy prices soaring.',
    effects: { both: { economy: -5 } },
    tensionChange: 5,
    severity: 'moderate'
  },
  {
    id: 'opec_decision',
    sector: 'Energy',
    sectorCode: 10,
    riskType: 'Strategic',
    riskId: 11,
    title: 'OPEC Production Cut',
    text: 'OPEC announces a surprise production cut, tightening global energy supplies.',
    effects: { both: { economy: -3 } },
    tensionChange: 3,
    severity: 'mild'
  },
  {
    id: 'renewable_breakthrough',
    sector: 'Energy',
    sectorCode: 10,
    riskType: 'Strategic',
    riskId: 11,
    title: 'Renewable Energy Breakthrough',
    text: 'A breakthrough in fusion energy research offers long-term energy independence prospects.',
    effects: { both: { stability: 3 } },
    tensionChange: -3,
    severity: 'positive'
  },
  {
    id: 'oil_embargo',
    sector: 'Energy',
    sectorCode: 10,
    riskType: 'Fuel Price',
    riskId: 23,
    title: 'Regional Energy Embargo',
    text: 'A coalition of energy producers imposes a targeted embargo against major consumers.',
    effects: { both: { economy: -8 } },
    tensionChange: 8,
    severity: 'severe'
  },

  // === MATERIALS (GICS 15) ===
  {
    id: 'rare_earth_shortage',
    sector: 'Materials',
    sectorCode: 15,
    riskType: 'Material Supply',
    riskId: 13,
    title: 'Rare Earth Export Restrictions',
    text: 'A major rare earth minerals producer restricts exports, threatening global tech supply chains.',
    effects: { both: { economy: -4 } },
    tensionChange: 4,
    severity: 'moderate'
  },
  {
    id: 'mining_disaster',
    sector: 'Materials',
    sectorCode: 15,
    riskType: 'Operational',
    riskId: 7,
    title: 'Mining Disaster',
    text: 'A catastrophic mine collapse kills hundreds of workers, drawing international scrutiny.',
    effects: { both: { stability: -3 } },
    tensionChange: 2,
    severity: 'moderate'
  },

  // === FINANCIALS (GICS 40) ===
  {
    id: 'currency_crisis',
    sector: 'Financials',
    sectorCode: 40,
    riskType: 'Foreign Exchange',
    riskId: 2,
    title: 'Currency Crisis',
    text: 'A major emerging market currency collapses, triggering contagion fears across global markets.',
    effects: { both: { economy: -6 } },
    tensionChange: 5,
    severity: 'severe'
  },
  {
    id: 'market_rally',
    sector: 'Financials',
    sectorCode: 40,
    riskType: 'Profit',
    riskId: 25,
    title: 'Global Market Rally',
    text: 'Coordinated central bank policy drives a global market rally, boosting economic confidence.',
    effects: { both: { economy: 5 } },
    tensionChange: -4,
    severity: 'positive'
  },
  {
    id: 'credit_freeze',
    sector: 'Financials',
    sectorCode: 40,
    riskType: 'Credit',
    riskId: 9,
    title: 'Credit Market Freeze',
    text: 'Interbank lending seizes up after a major institution defaults on obligations.',
    effects: { both: { economy: -7, stability: -3 } },
    tensionChange: 6,
    severity: 'severe'
  },

  // === HEALTH CARE (GICS 35) ===
  {
    id: 'pandemic',
    sector: 'Health Care',
    sectorCode: 35,
    riskType: 'Systematic',
    riskId: 6,
    title: 'Pandemic Outbreak',
    text: 'A novel pathogen emerges with rapid human-to-human transmission, overwhelming health systems.',
    effects: { both: { stability: -8, economy: -5 } },
    tensionChange: 3,
    severity: 'severe'
  },
  {
    id: 'vaccine_breakthrough',
    sector: 'Health Care',
    sectorCode: 35,
    riskType: 'Medical Interest',
    riskId: 29,
    title: 'Vaccine Breakthrough',
    text: 'A universal vaccine platform is developed, offering protection against multiple disease families.',
    effects: { both: { stability: 5 } },
    tensionChange: -3,
    severity: 'positive'
  },
  {
    id: 'drug_shortage',
    sector: 'Health Care',
    sectorCode: 35,
    riskType: 'Material Supply',
    riskId: 13,
    title: 'Critical Drug Shortage',
    text: 'Supply chain failures cause shortages of essential medications in multiple countries.',
    effects: { both: { stability: -4 } },
    tensionChange: 3,
    severity: 'moderate'
  },

  // === INFORMATION TECHNOLOGY (GICS 45) ===
  {
    id: 'cyber_attack',
    sector: 'Information Technology',
    sectorCode: 45,
    riskType: 'IT',
    riskId: 4,
    title: 'State-Sponsored Cyber Attack',
    text: 'A sophisticated cyber operation targets critical infrastructure across multiple nations.',
    effects: { both: { stability: -5, economy: -3 } },
    tensionChange: 7,
    severity: 'severe'
  },
  {
    id: 'tech_breakthrough',
    sector: 'Information Technology',
    sectorCode: 45,
    riskType: 'Strategic',
    riskId: 11,
    title: 'AI Technology Breakthrough',
    text: 'A major AI advancement creates new economic possibilities and raises governance questions.',
    effects: { both: { economy: 4, influence: 2 } },
    tensionChange: 2,
    severity: 'positive'
  },
  {
    id: 'data_breach',
    sector: 'Information Technology',
    sectorCode: 45,
    riskType: 'Reputational',
    riskId: 1,
    title: 'Massive Data Breach',
    text: 'Classified government communications are leaked, exposing diplomatic secrets.',
    effects: { both: { reputation: -5 } },
    tensionChange: 4,
    severity: 'moderate'
  },

  // === UTILITIES (GICS 55) ===
  {
    id: 'grid_failure',
    sector: 'Utilities',
    sectorCode: 55,
    riskType: 'Operational',
    riskId: 7,
    title: 'Power Grid Failure',
    text: 'Cascading failures take down electrical grids across a major metropolitan region.',
    effects: { both: { stability: -4, economy: -2 } },
    tensionChange: 2,
    severity: 'moderate'
  },

  // === INDUSTRIALS (GICS 20) ===
  {
    id: 'trade_boom',
    sector: 'Industrials',
    sectorCode: 20,
    riskType: 'Profit',
    riskId: 25,
    title: 'Global Trade Boom',
    text: 'New trade agreements and shipping routes drive a surge in global commerce.',
    effects: { both: { economy: 6 } },
    tensionChange: -5,
    severity: 'positive'
  },
  {
    id: 'supply_chain_collapse',
    sector: 'Industrials',
    sectorCode: 20,
    riskType: 'Material Supply',
    riskId: 13,
    title: 'Supply Chain Collapse',
    text: 'A critical shipping chokepoint is blocked, disrupting global supply chains for weeks.',
    effects: { both: { economy: -6 } },
    tensionChange: 5,
    severity: 'severe'
  },

  // === CONSUMER (GICS 25/30) ===
  {
    id: 'food_crisis',
    sector: 'Consumer Staples',
    sectorCode: 30,
    riskType: 'Systematic',
    riskId: 6,
    title: 'Global Food Crisis',
    text: 'Drought and conflict converge to create food shortages across multiple regions.',
    effects: { both: { stability: -6 } },
    tensionChange: 6,
    severity: 'severe'
  },
  {
    id: 'consumer_confidence',
    sector: 'Consumer Discretionary',
    sectorCode: 25,
    riskType: 'Profit',
    riskId: 25,
    title: 'Consumer Confidence Surge',
    text: 'Global consumer confidence reaches multi-year highs, driving economic expansion.',
    effects: { both: { economy: 4, stability: 2 } },
    tensionChange: -3,
    severity: 'positive'
  },

  // === TELECOM (GICS 50) ===
  {
    id: 'comms_disruption',
    sector: 'Telecommunication Services',
    sectorCode: 50,
    riskType: 'IT',
    riskId: 4,
    title: 'Submarine Cable Sabotage',
    text: 'Undersea communication cables are severed in suspicious circumstances, disrupting internet traffic.',
    effects: { both: { stability: -3, economy: -2 } },
    tensionChange: 5,
    severity: 'moderate'
  },

  // === NATURAL DISASTERS (Systematic Risk) ===
  {
    id: 'earthquake',
    sector: 'Systematic',
    sectorCode: 0,
    riskType: 'Systematic',
    riskId: 6,
    title: 'Major Earthquake',
    text: 'A devastating earthquake strikes a densely populated coastal region.',
    effects: { both: { stability: -5, economy: -4 } },
    tensionChange: -2,
    severity: 'severe'
  },
  {
    id: 'hurricane',
    sector: 'Systematic',
    sectorCode: 0,
    riskType: 'Systematic',
    riskId: 6,
    title: 'Category 5 Hurricane',
    text: 'A massive hurricane makes landfall, causing widespread destruction and displacement.',
    effects: { both: { stability: -4, economy: -3 } },
    tensionChange: -2,
    severity: 'severe'
  }
];

/**
 * Select a random event, with severity weighted by Global Tension.
 * High tension = more likely to get severe events.
 */
function getRandomEvent(tension) {
  const roll = Math.random() * 100;
  let pool;

  if (tension > 70) {
    // High tension: 50% severe, 30% moderate, 10% mild, 10% positive
    if (roll < 50) pool = WORLD_EVENTS.filter(e => e.severity === 'severe');
    else if (roll < 80) pool = WORLD_EVENTS.filter(e => e.severity === 'moderate');
    else if (roll < 90) pool = WORLD_EVENTS.filter(e => e.severity === 'mild');
    else pool = WORLD_EVENTS.filter(e => e.severity === 'positive');
  } else if (tension > 40) {
    // Medium tension: 25% severe, 35% moderate, 15% mild, 25% positive
    if (roll < 25) pool = WORLD_EVENTS.filter(e => e.severity === 'severe');
    else if (roll < 60) pool = WORLD_EVENTS.filter(e => e.severity === 'moderate');
    else if (roll < 75) pool = WORLD_EVENTS.filter(e => e.severity === 'mild');
    else pool = WORLD_EVENTS.filter(e => e.severity === 'positive');
  } else {
    // Low tension: 10% severe, 25% moderate, 20% mild, 45% positive
    if (roll < 10) pool = WORLD_EVENTS.filter(e => e.severity === 'severe');
    else if (roll < 35) pool = WORLD_EVENTS.filter(e => e.severity === 'moderate');
    else if (roll < 55) pool = WORLD_EVENTS.filter(e => e.severity === 'mild');
    else pool = WORLD_EVENTS.filter(e => e.severity === 'positive');
  }

  // Fallback if pool is empty
  if (!pool || pool.length === 0) pool = WORLD_EVENTS;

  return pool[Math.floor(Math.random() * pool.length)];
}
