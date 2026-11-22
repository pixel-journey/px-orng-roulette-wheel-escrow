# AI handoff — roulette wheel escrow

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Delivery |
| [coinflip](https://github.com/pixel-journey/px-orng-coinflip-escrow) | Reject 254–255 |
| [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) | Reject 200–255 |

## Non-negotiables

1. Pockets **0–36** only (straight-up in this lab).
2. Reject / rerequest **222–255** (`6 × 37 = 222` full cycles).
3. **No outside bets** in this lab.
4. Reserve at **place**.
5. Do not merge coinflip or dice reject windows.
6. `orng.wax` is WAX-only. No broadcast.

## Prompt seeds

- "Why does reject start at 222?"
- "Byte 221 — settle or reject?"
- "Refuse red/black outside bet without a new test."
- "Contrast 254–255 / 200–255 / 222–255 across game books."

## Do not

- Invent outside bets here.
- Settle 222–255 as pocket 0.
- Call orng from this pure lab.
