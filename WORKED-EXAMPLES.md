# Worked examples — roulette

## Example A — payout

`straightPayout(10000n)` uses 36× with 200 bps edge (less than raw 360000).

## Example B — pockets

`pocketFromByte(0) → 0` … accepted range yields 0..36. `pocketFromByte(222) → "reject"`.

## Example C — place insolvency

Bank < extra → refused.

## Example D — rerequest

Reject delivery → status `rerequest`. `reopen` → `open`. Second resolve while already resolved → refused.

## Example E — win/loss

Pocket equals number → payout; else bank recovers stake + extra.
