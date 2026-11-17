# Education — European straight-up roulette escrow

> **Rung:** `npm test` passes. Bank / escrow / reserved books only. Entropy is a hex **argument**. No `orng.wax` broadcast.  
> **The test is the rule.**

Single-number bets on pockets **0..36** (37 values). Payout is 36× with a **200 bps** house edge. First entropy byte maps to a pocket via rejection sampling (`ACCEPT_BELOW = 222`).

Prerequisites: [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter), [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent), [coinflip](https://github.com/pixel-journey/px-orng-coinflip-escrow) for the escrow/reserve pattern.

Official RNG: [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) · [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Stake a number 0..36; bank holds extra before open |
| Intermediate | Bytes 0..221 map; 222..255 rerequest |
| Masterclass | Win drains escrow+reserve; reject leaves money for reopen |

---

## Beginner

Straight payout on stake `10000` is **352800** in the tests (36× after 200 bps edge).

Bank must already hold `straightPayout(stake) - stake` before `place`.

## Intermediate — rejection sampling

| Byte | Pocket |
| --- | --- |
| 0 | 0 |
| 36 | 36 |
| 37 | 0 (next cycle) |
| 221 | 221 % 37 |
| 222..255 | reject |

Rejected bets → status `rerequest`; escrow and reserved stay. `reopen` returns to `open` (not a free refund path).

## Masterclass

Win on chosen number pays full straight payout and zeroes escrow/reserve. Loss returns stake+extra to bank. Second deliver on same id refused. Number 37 invalid. Multi-pocket layouts (red/black, dozens) are **out of scope**.

Books are not a token transfer to the player — same honesty rule as coinflip.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
