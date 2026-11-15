# Education — European roulette escrow

## Beginner

One number, one stake. The wheel has 37 pockets including zero. A fair byte sample must not favor low numbers, so only 222 of 256 byte values are accepted (six full sets of 37).

A win pays about 36× the stake after a 200 bps house edge. The bank must reserve `payout - stake` before the bet is accepted.

## Intermediate

| Function | Role |
| --- | --- |
| `place` | Takes stake into escrow, locks reserve from the bank |
| `deliver` | Maps first entropy byte to a pocket, pays or loses, or marks rerequest |
| `reopen` | Only from `rerequest` |

Reject does not pay and does not release escrow. A second deliver on a resolved bet is refused.

## Masterclass (not in this repo)

- Multi-number layouts (splits, streets, dozens).
- Live `orng.wax` job and credits.
- Token custody and wasm.

## Outcomes

1. State why 222, not 256, is the accept bound.
2. Compute the reserve for a given stake from `straightPayout`.
3. Show a reject path that leaves escrow intact.
