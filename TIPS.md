# Tips

- Reserve at place time. Accepting a bet the bank cannot cover is the solvency bug.
- `pocketFromByte(37) === 0` is intentional: the second band of 37 starts over.
- Rerequest is not a free re-spin of the same entropy; call `reopen` then wait for new bytes.
- Do not treat this as American roulette (00). Only 0..36.
