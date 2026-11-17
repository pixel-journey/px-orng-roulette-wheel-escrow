# Tips — European straight-up roulette escrow

## Scope

This lab is **straight-up only** (single pocket 0..36). Red/black, dozens, and splits need new tests and a different payout table. Do not pretend they are covered.

## Fairness

- Accept pockets `0..36` only. Number 37 is refused.
- Bytes **222..255** are **rerequest**, not pocket 0. (`222 = 6 × 37`; the unbiased window is `0..221`.)
- A rejected sample must not settle the bet.

## Solvency

- Fund the bank with `straightPayout(stake) - stake` **before** accepting the bet.
- Cap open liability so two concurrent max straight-ups cannot share one extra.
- Wire real delivery through [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) once-resolve.

## Common mistakes

1. Mapping high bytes into pocket 0 and calling it "house edge."
2. Accepting 37 because "wheels have 0."
3. Implementing red/black with the straight-up reserve formula.
4. Settling before the reject check.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Outside bets | Separate payout and reserve math |
| Multi-pocket ticket | Cap sum of max liabilities |
| Token credit on win | After once-resolve |

Related: [coinflip](https://github.com/pixel-journey/px-orng-coinflip-escrow) · [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md) · [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng)
