# Statecraft — state.riskrunners.com

A browser-based strategy game that teaches the mechanics of international relations through real-world event coding systems.

## Play

Open `index.html` in any modern browser. No server, no build step, no dependencies.

**Live:** [state.riskrunners.com](https://state.riskrunners.com) — deployed via GitHub Pages.

## What You'll Learn

Every move in this game corresponds to a real event code from:

- **IDEA** (Integrated Data for Events Analysis) — The taxonomy of international actions
- **GDELT** (Global Database of Events, Language, and Tone) — How global events are classified
- **GICS** (Global Industry Classification Standard) — Sector-based economic categorization

Players learn the vocabulary and mechanics of statecraft — the same coding systems used by political scientists, intelligence analysts, and risk managers to track global events.

## How It Works

- Choose cooperative, confrontational, or strategic moves each turn
- Manage 5 national attributes: Influence, Economy, Military, Stability, Reputation
- React to random world events tied to GICS economic sectors
- Each move has a Goldstein Score (-10 to +10) showing its cooperative/hostile nature
- Win by reaching 75 Influence or causing opponent collapse (Stability = 0)

## Data Sources

The `data/` directory contains the original CSV reference data:

| File | Contents |
|------|----------|
| IDEA_1ST_ORDER.csv | Top-level event actions (Yield, Consult, Threaten, etc.) |
| IDEA_2ND_ORDER.csv | Detailed sub-actions |
| GDELT_2nd_ORDER.csv | Extended GDELT event taxonomy |
| GICS_1ST_ORDER.csv | Economic sectors |
| GICS_2nd_ORDER.csv | Industry sub-sectors |
| RISK_SUMMARY.csv | Risk category definitions |
| GOVERNANCE_FUNCTIONS.csv | Governance impact mappings |

## Tech Stack

- Vanilla HTML / CSS / JavaScript
- No frameworks, no build tools, no backend
- Works offline after first load
- Responsive design (desktop + tablet)

## Inspired By

- [street.riskrunners.com](https://street.riskrunners.com) — Tangible learning through plays
- Robert Kiyosaki's CASHFLOW — Learning finance through games
- The Goldstein Scale — Quantifying international cooperation and conflict

## License

Educational use. Event code data derived from public academic datasets.
