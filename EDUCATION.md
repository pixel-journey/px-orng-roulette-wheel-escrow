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

```bash
npm test
```

---

## Intermediate — rejection sampling

| Byte | Pocket |
| --- | --- |
| 0 | 0 |
| 36 | 36 |
| 37 | 0 (next cycle) |
| 221 | 221 % 37 |
| 222..255 | reject |

Why 222? `6 × 37 = 222`. Bytes `0..221` are six full sets of pockets; the remaining 34 values would bias low residues if used.

Rejected bets → status `rerequest`; escrow and reserved stay. `reopen` returns to `open` (not a free refund path).

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Map 222..255 into pocket 0 | reject / rerequest |
| Number 37 | invalid |
| Settle reject sample | refused |
| Reuse coinflip 254–255 window | this lab is **222** |
| Outside bet with this formula | wrong product |

---

## Masterclass

Win on chosen number pays full straight payout and zeroes escrow/reserve. Loss returns stake+extra to bank. Second deliver on same id refused.

**Scope is straight-up only.** Red/black, dozens, and splits need new tests and a different payout/reserve table. Do not paste this formula into an outside bet.

Books are not a token transfer to the player — same honesty rule as coinflip.

### Common mistakes

1. Mapping high bytes into pocket 0 and calling it house edge.  
2. Accepting 37 because "wheels have zero."  
3. Reusing coinflip’s 254–255 or dice’s 200–255 reject window.  
4. Settling a rejected sample.  
5. Sharing one bank extra across two concurrent max straight-ups.

### Exercises

1. Why is `ACCEPT_BELOW` 222, not 256? (**6×37 unbiased sets**.)  
2. Does a rerequest refund the player immediately? (**No**.)  
3. Preferred RNG on WAX mainnet? (`orng.wax`)

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) · [SECURITY](SECURITY.md) · [SOURCES](SOURCES.md).

---

## What this course will not teach

- Outside bets / multi-pocket tickets
- Live oracle auth
- Token broadcast of payouts
