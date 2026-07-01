# Statecraft: The International Relations Game

## Game Design Document

### Concept

Statecraft is a turn-based browser game where 2 players (or 1 player vs AI) represent nation-states navigating the international stage. Players make diplomatic, economic, and military moves drawn from real-world event coding systems (IDEA/GDELT). The goal is to accumulate Influence Points (IP) while managing relationships, resources, and risk — teaching players the "Street Math" of how countries actually operate.

---

### Core Mechanics

#### Players
- 2 players (Human vs Human or Human vs AI)
- Each player represents a nation-state with attributes:
  - **Influence** (0-100): Political capital and global standing
  - **Economy** (0-100): Economic strength and resources
  - **Military** (0-100): Military capability
  - **Stability** (0-100): Internal domestic stability
  - **Reputation** (0-100): How other actors perceive you

#### Win Condition
- First player to reach **75 Influence Points** wins
- OR: If opponent's Stability drops to 0, they collapse (you win)
- Game ends after 20 rounds if neither condition met (highest Influence wins)

#### Turn Structure
1. **Event Phase**: A random world event fires (drawn from GDELT patterns), affecting both players
2. **Action Phase**: Active player selects ONE move from their available actions
3. **Resolution Phase**: Move effects are calculated, opponent may have a reaction
4. **Economy Phase**: Passive income/costs are applied based on current state

---

### Move Categories (from IDEA Event Codes)

#### Cooperative Moves (Positive Goldstein Score)
| Move | IDEA Code | Cost | Effect | Description |
|------|-----------|------|--------|-------------|
| Yield | 01 | -5 Economy | +10 Reputation, +5 opponent Reputation | Concede a position to build goodwill |
| Consult | 03 | -3 Economy | +5 Influence, +3 Reputation | Engage in diplomatic discussions |
| Endorse | 04 | 0 | +5 Reputation, +3 Influence | Publicly support another's position |
| Promise | 05 | 0 | +8 Influence (delayed) | Commit to future action (must fulfill or lose Reputation) |
| Grant | 06 | -10 Economy | +15 Reputation, +8 Influence | Provide aid, asylum, or resources |
| Reward | 07 | -8 Economy | +10 Influence, +5 Reputation | Extend economic or military aid |
| Agree | 08 | 0 | +7 Influence, +5 Stability | Sign a formal agreement |
| Cooperate | 30 | -5 Economy | +12 Influence, +8 Reputation | Material cooperation (economic/military) |

#### Confrontational Moves (Negative Goldstein Score)
| Move | IDEA Code | Cost | Effect | Description |
|------|-----------|------|--------|-------------|
| Reject | 11 | 0 | -5 Reputation, +3 Stability | Refuse a proposal or demand |
| Accuse | 12 | 0 | -8 opponent Reputation, -3 own Reputation | Publicly blame for wrongdoing |
| Demand | 15 | -2 Military | +5 Influence, -5 Reputation | Insist on compliance |
| Warn | 16 | -3 Military | -5 opponent Stability, -2 Reputation | Signal consequences |
| Threaten | 17 | -5 Military | -10 opponent Stability, -5 Reputation | Direct threat of force |
| Sanction | 19 | -5 Economy | -10 opponent Economy, -3 Reputation | Economic restrictions |
| Expel | 20 | -3 Stability | -5 opponent Influence, -5 Reputation | Remove diplomats or agents |
| Seize | 21 | -8 Military | -15 opponent Economy, -10 Reputation | Take possession by force |
| Force | 22 | -15 Military, -10 Economy | -20 opponent Military, -15 Reputation | Military engagement |

#### Strategic Moves
| Move | IDEA Code | Cost | Effect | Description |
|------|-----------|------|--------|-------------|
| Propose | 10 | 0 | Sets up future Agreement (+3 Influence) | Offer a peace proposal or plan |
| Demonstrate | 18 | -5 Stability | +8 Influence, -3 opponent Stability | Show of force or protest |
| Vote | 25 | 0 | +5 Influence, +3 Stability | Electoral or institutional action |
| Negotiate | 54 | -3 Economy | +10 Influence (if accepted) | Formal negotiation |
| Investigate | 33 | -5 Economy | Reveal opponent's hidden stats | Intelligence gathering |

---

### Event System (Random World Events)

Events fire at the start of each turn, drawn from GDELT event patterns and GICS sector categories. They affect both players or create opportunities.

#### Event Categories (from GICS Sectors)
| Sector | Example Events |
|--------|---------------|
| Energy (10) | Oil price spike, pipeline disruption, OPEC decision |
| Materials (15) | Rare earth shortage, mining disaster |
| Financials (40) | Currency crisis, market crash, credit freeze |
| Health Care (35) | Pandemic outbreak, drug shortage |
| Information Technology (45) | Cyber attack, tech breakthrough |
| Utilities (55) | Infrastructure failure, energy grid hack |

#### Risk Types (from RISK_SUMMARY)
Events carry risk types that map to player attributes:
- Reputational Risk → affects Reputation
- Foreign Exchange Risk → affects Economy
- IT Risk → affects Stability
- Liquidity Risk → affects Economy
- Strategic Risk → affects Influence
- Human Capital Risk → affects Stability
- Military/Systematic Risk → affects Military

---

### Goldstein Scale Integration

Each move has a Goldstein score (from -10 to +10) that represents how cooperative or hostile the action is. This affects:
- How the opponent and world perceive you (Reputation)
- Whether escalation or de-escalation spirals form
- The "temperature" of the game (tracked as Global Tension meter)

**Global Tension** (0-100):
- Starts at 30
- Hostile moves increase it
- Cooperative moves decrease it
- High tension (>70) makes events more severe
- Low tension (<30) provides economic bonuses

---

### Educational Component

Each move has:
1. **Name** (from IDEA codes)
2. **Real-world example** (what this looks like in practice)
3. **Strategic tip** (when to use this move)
4. **Historical example** (a real instance of this action)

This teaches players the vocabulary of international relations while they play.

---

### Technology Stack

- **Pure HTML/CSS/JavaScript** — no frameworks, no build step
- **Static site** — GitHub Pages compatible
- **Local Storage** — save game state
- **No backend** — all logic client-side
- **Responsive** — works on desktop and tablet

### File Structure
```
event.item.insure/
├── index.html              # Game entry point
├── css/
│   └── style.css           # Game styling
├── js/
│   ├── game.js            # Core game engine
│   ├── moves.js           # Move definitions and effects
│   ├── events.js          # Random event system
│   ├── ai.js             # Simple AI opponent
│   └── ui.js             # UI rendering and interaction
├── data/
│   ├── IDEA_1ST_ORDER.csv
│   ├── IDEA_2ND_ORDER.csv
│   ├── GDELT_1ST_ORDER.csv
│   ├── GDELT_2nd_ORDER.csv
│   ├── GICS_1ST_ORDER.csv
│   ├── GICS_2nd_ORDER.csv
│   ├── RISK_SUMMARY.csv
│   ├── GOVERNANCE_FUNCTIONS.csv
│   └── 20151025.export.CSV
└── README.md               # How to play, how to host
```
