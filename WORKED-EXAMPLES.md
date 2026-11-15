# Worked examples — European straight-up roulette

Pockets are `0..36` (37 values). `EDGE_BPS` is `200`. Straight payout on stake `10000` is `352800` (36× with edge).

`ACCEPT_BELOW` is 222: bytes `0..221` map fairly onto 37 pockets; `222..255` reject.

| Byte | Pocket |
| --- | --- |
| `0` | 0 |
| `36` | 36 |
| `37` | 0 (second full set of 37) |
| `221` | `221 % 37` |
| `222` and `255` | `reject` |

## Win on 17

Bank starts with only the extra: `straightPayout(1000n) - 1000n`.

Alice stakes `1000` on number 17. Entropy first byte is `0x11` (17). She is paid `straightPayout(1000n)`. Escrow, reserved, and bank all end at `0`.

## Loss

Same stake and number. First byte `00` → pocket 0. Payout `0`. Bank becomes stake + extra.

## Rerequest

Stake `100` on 0. First byte `ff` → status `rerequest`. Escrow and reserved stay. `reopen` returns status `open`. `reopen` on a still-open bet throws `not rerequest`.

## Refusals

| Case | Error |
| --- | --- |
| number `37` | bad number |
| stake `0` | bad stake |
| bank `0` with a real stake | bank |
| deliver id `9` | missing bet |
| second deliver on same id | already resolved |

No multi-bet layouts. No `orng.wax` call — the hex is an argument.
