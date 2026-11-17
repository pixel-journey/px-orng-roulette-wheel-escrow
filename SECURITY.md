# Security — roulette wheel escrow

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Bad number / zero stake | refused |
| Bank cannot reserve extra | refused |
| Reject sample | rerequest; no settle |
| Second deliver | already resolved |
| Missing bet id | refused |

## Not closed

| Concern | Guidance |
| --- | --- |
| Oracle auth | require_auth(orng.wax) |
| Token payout | Inline transfer after books update |
| Multi-bet solvency | Sum reserved across open bets |

No live `orng.wax` in this repository.
