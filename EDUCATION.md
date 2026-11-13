# Education — European roulette (straight-up)

> **Rung:** `npm test` passes. Prefer oracle entropy from the ORNG infra labs.  
> Straight-up only; 37 pockets (0..36).

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Map byte → pocket without bias |
| Intermediate | 200 bps edge on 36× fair payout |
| Masterclass | Bank reserve + rerequest status on reject |

## Beginner

Straight bet on a single number. Fair multiplier is 36× stake; this lab pays `stake * 36 * 9800 / 10000` (2% edge).

## Intermediate

`pocketFromByte`: accept `byte < 222` so `byte % 37` is uniform over 0..36. Bytes `222..255` → **reject** / rerequest (not a forced pocket).

## Masterclass

Same solvency pattern as dice: reserve `payout - stake` at place. Reject sets status `rerequest`; `reopen` returns to `open` without releasing reserve until a real resolve or a separate cancel policy (not in this lab).

## Will not teach

Outside bets (red/black), multi-number streets, or live orng delivery.
