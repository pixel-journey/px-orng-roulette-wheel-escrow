# px-orng-roulette-wheel-escrow

> **Trust:** private educational lab (Tier B)  
> **Quest:** 006 — European wheel from one 256-bit value  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

Straight-up bets on pockets **0..36**. Bytes **0..221** map uniformly (6 full cycles); **222..255** reject → `rerequest` without paying. Payout is `stake * 36 * 9800 / 10000` (200 bps edge). Bank reserves the extra at place.

**Real code:** `npm test`. No live `orng.wax`, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
