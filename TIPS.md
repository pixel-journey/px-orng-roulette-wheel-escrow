# Tips — roulette escrow

## Do

- Fund bank with `straightPayout(stake) - stake` **before** accepting the bet.  
- Treat high bytes (222..255) as **rerequest**, not pocket 0.  
- Cap open liability so two concurrent bets cannot share one extra.  
- Wire real delivery through dual-callback once-resolve.

## Don't

- Accept number 37.  
- Settle on a rejected sample.  
- Implement red/black here without new tests (scope is straight-up only).

## Related

[coinflip](https://github.com/pixel-journey/px-orng-coinflip-escrow) · [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)
