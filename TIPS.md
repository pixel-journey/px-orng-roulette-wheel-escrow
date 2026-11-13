# Tips — roulette

- Reject high bytes; do not `byte % 37` on the full 0..255 range.
- Share bank-reserve pattern with [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout).
- Document rerequest UX (player waits for new oracle job).
