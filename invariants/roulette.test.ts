import assert from "node:assert/strict";
import test from "node:test";
import {
  EDGE_BPS,
  ACCEPT_BELOW,
  emptyBooks,
  place,
  deliver,
  reopen,
  straightPayout,
  pocketFromByte,
  byte0,
} from "./roulette.ts";

test("straight payout applies 200 bps edge on 36x", () => {
  assert.equal(straightPayout(10000n), 352800n);
  assert.equal(EDGE_BPS, 200);
});

test("pocketFromByte is uniform on 0..221 and rejects 222+", () => {
  assert.equal(pocketFromByte(0), 0);
  assert.equal(pocketFromByte(36), 36);
  assert.equal(pocketFromByte(37), 0);
  assert.equal(pocketFromByte(ACCEPT_BELOW - 1), (ACCEPT_BELOW - 1) % 37);
  assert.equal(pocketFromByte(222), "reject");
  assert.equal(pocketFromByte(255), "reject");
});

test("win straight-up pays from reserve", () => {
  const extra = straightPayout(1000n) - 1000n;
  const open = place(emptyBooks(extra), {
    id: "1",
    player: "alice",
    stake: "1000",
    number: 17,
  });
  const hex = (17).toString(16).padStart(2, "0") + "11".repeat(31);
  assert.equal(pocketFromByte(byte0(hex)), 17);
  const paid = deliver(open, "1", hex);
  assert.equal(paid.bets[0].payout, straightPayout(1000n).toString());
  assert.equal(paid.escrow, "0");
  assert.equal(paid.reserved, "0");
  assert.equal(paid.bank, "0");
});

test("loss returns stake and reserve to bank", () => {
  const extra = straightPayout(1000n) - 1000n;
  const open = place(emptyBooks(extra), {
    id: "1",
    player: "alice",
    stake: "1000",
    number: 17,
  });
  const hex = "00" + "22".repeat(31);
  const lost = deliver(open, "1", hex);
  assert.equal(lost.bets[0].payout, "0");
  assert.equal(lost.bets[0].pocket, 0);
  assert.equal(lost.bank, (1000n + extra).toString());
});

test("reject sample marks rerequest without paying", () => {
  const extra = straightPayout(100n) - 100n;
  const open = place(emptyBooks(extra), {
    id: "1",
    player: "bob",
    stake: "100",
    number: 0,
  });
  const hex = "ff" + "33".repeat(31);
  const held = deliver(open, "1", hex);
  assert.equal(held.bets[0].status, "rerequest");
  assert.equal(held.escrow, "100");
  assert.equal(held.reserved, extra.toString());
  const again = reopen(held, "1");
  assert.equal(again.bets[0].status, "open");
});

test("bad number, zero stake, bank short refused", () => {
  assert.throws(
    () => place(emptyBooks(1_000_000n), { id: "1", player: "alice", stake: "10", number: 37 }),
    /bad number/,
  );
  assert.throws(
    () => place(emptyBooks(1_000_000n), { id: "1", player: "alice", stake: "0", number: 1 }),
    /bad stake/,
  );
  assert.throws(
    () => place(emptyBooks(0n), { id: "1", player: "alice", stake: "1000", number: 1 }),
    /bank/,
  );
});

test("missing bet and double resolve refused", () => {
  const extra = straightPayout(50n) - 50n;
  const open = place(emptyBooks(extra), {
    id: "1",
    player: "alice",
    stake: "50",
    number: 5,
  });
  assert.throws(() => deliver(open, "9", "05" + "11".repeat(31)), /missing bet/);
  const once = deliver(open, "1", "05" + "11".repeat(31));
  assert.throws(() => deliver(once, "1", "05" + "11".repeat(31)), /already resolved/);
});

test("reopen only from rerequest", () => {
  const extra = straightPayout(50n) - 50n;
  const open = place(emptyBooks(extra), {
    id: "1",
    player: "alice",
    stake: "50",
    number: 5,
  });
  assert.throws(() => reopen(open, "1"), /not rerequest/);
});
