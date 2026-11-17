# Security — European straight-up roulette escrow

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Number 37 / zero stake | refused |
| Bank cannot reserve `straightPayout - stake` | refused at **place** |
| Bytes 222..255 | **rerequest**; no settle |
| Second deliver | already resolved |
| Missing bet id | refused |
| Reopen when not in rerequest | refused |

Scope is **straight-up only**. Red/black and outside bets are not covered and must not reuse this reserve formula without new tests.

## Authorization (production still needs)

| Concern | Guidance |
| --- | --- |
| Oracle | `require_auth(orng.wax)` |
| Player | `require_auth` on place |
| Multi-bet solvency | Sum of open max liabilities ≤ bank |
| Token payout | Inline transfer after books update |
| Dual callback | Shared once-resolve |

## Attack angles

1. Mapping high bytes into pocket 0 as a fake house edge.
2. Accepting 37 because “wheels have zero.”
3. Settling a rejected sample.
4. Sharing one bank extra across two concurrent max straight-ups.

## Honesty limits

No live `orng.wax`. Hex is an argument. Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). Related: [coinflip](https://github.com/pixel-journey/px-orng-coinflip-escrow) · [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout).
