# European roulette from one 256-bit value

> **Domain:** WAX ORNG — roulette escrow  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Straight-up bets on pockets **0..36**. Bytes **0..221** map uniformly (6 full cycles of 37); **222..255** reject → `rerequest` without paying. Payout is `stake * 36 * 9800 / 10000` (200 bps edge). Bank reserves the extra at place.

**Code under test:** `npm test`. No live `orng.wax`, no wasm.

**Official RNG:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). **Sample:** [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

```bash
npm test
```

MIT — Pixel Journey
