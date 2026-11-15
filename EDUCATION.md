# Education — European straight-up roulette escrow

Single-number bets on pockets `0..36`. Payout is 36× with a **200 bps** house edge. Entropy is a 32-byte hex argument; the first byte maps to a pocket via rejection sampling.

## Beginner

1. Stake and pick a number in `0..36`.
2. Bank must hold the extra payout beyond the stake before the bet opens.
3. Deliver entropy: matching pocket pays `straightPayout(stake)`; other pocket pays 0.

## Intermediate

`ACCEPT_BELOW = 222`: bytes 0..221 are six full cycles of 37 plus a partial; 222..255 reject. Rejected bets go to `rerequest` without settling escrow.

Straight payout on 10000 is **352800** in the tests.

## Masterclass (not in this repo)

Live orng.wax dual-callback, multi-pocket bets (split, street, dozen), C++ bank table.

## Outcomes

1. Map bytes 0, 36, 37, 221, 222 from tests.
2. Show win on 17 drains escrow and reserve.
3. Show reject leaves escrow and allows reopen.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
