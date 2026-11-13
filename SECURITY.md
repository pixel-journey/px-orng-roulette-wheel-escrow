# Security notes — roulette

| Mitigated | Behavior |
| --- | --- |
| Bad number / stake | refused |
| Bank < extra | refused |
| Reject sample | rerequest, not settle |
| Double resolve | refused |

Production: oracle auth, token escrow, explicit cancel path for stuck rerequests.
