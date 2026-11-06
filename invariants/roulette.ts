/**
 * European roulette (0..36) from one 256-bit value without modulo bias.
 * Straight-up only in this lab. House edge via 200 bps on fair 36/1.
 * Bank reserves extra at place. No live orng.wax.
 */

export const EDGE_BPS = 200;
export const POCKETS = 37;
export const ACCEPT_BELOW = 222;

export type BetKind = "straight";

export type Bet = {
  id: string;
  player: string;
  stake: string;
  kind: BetKind;
  number: number;
  status: "open" | "resolved" | "rerequest";
  pocket: number | null;
  payout: string | null;
};

export type Books = {
  bank: string;
  escrow: string;
  reserved: string;
  bets: Bet[];
};

const NAME = /^[a-z1-5.]{1,12}$/;
const U64 = /^(0|[1-9][0-9]{0,19})$/;
const HEX = /^[0-9a-f]{64}$/;

export function emptyBooks(bank: bigint): Books {
  if (bank < 0n) throw new Error("bad bank");
  return { bank: bank.toString(), escrow: "0", reserved: "0", bets: [] };
}

export function straightPayout(stake: bigint): bigint {
  if (stake < 1n) throw new Error("bad stake");
  return (stake * 36n * BigInt(10000 - EDGE_BPS)) / 10000n;
}

export function byte0(randomHex: string): number {
  if (!HEX.test(randomHex)) throw new Error("bad random");
  return parseInt(randomHex.slice(0, 2), 16);
}

export function pocketFromByte(byte: number): number | "reject" {
  if (!Number.isInteger(byte) || byte < 0 || byte > 255) throw new Error("bad byte");
  if (byte >= ACCEPT_BELOW) return "reject";
  return byte % POCKETS;
}

function assertName(name: string): void {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) throw new Error("bad name");
}

function u64(value: string, label: string): bigint {
  if (!U64.test(value)) throw new Error("bad " + label);
  const n = BigInt(value);
  if (n > 0xffffffffffffffffn) throw new Error("bad " + label);
  return n;
}

function clone(b: Books): Books {
  return {
    bank: b.bank,
    escrow: b.escrow,
    reserved: b.reserved,
    bets: b.bets.map((x) => ({ ...x })),
  };
}

export function place(
  books: Books,
  input: { id: string; player: string; stake: string; number: number },
): Books {
  assertName(input.player);
  if (!Number.isInteger(input.number) || input.number < 0 || input.number > 36) {
    throw new Error("bad number");
  }
  const id = u64(input.id, "id");
  const stake = u64(input.stake, "stake");
  if (stake < 1n) throw new Error("bad stake");
  if (books.bets.some((b) => b.id === id.toString())) throw new Error("duplicate id");
  const payout = straightPayout(stake);
  if (payout < stake) throw new Error("payout below stake");
  const extra = payout - stake;
  const bank = BigInt(books.bank);
  if (bank < extra) throw new Error("bank");
  const next = clone(books);
  next.bank = (bank - extra).toString();
  next.escrow = (BigInt(books.escrow) + stake).toString();
  next.reserved = (BigInt(books.reserved) + extra).toString();
  next.bets.push({
    id: id.toString(),
    player: input.player,
    stake: stake.toString(),
    kind: "straight",
    number: input.number,
    status: "open",
    pocket: null,
    payout: null,
  });
  return next;
}

export function deliver(books: Books, id: string, randomHex: string): Books {
  const betId = u64(id, "id").toString();
  if (!HEX.test(randomHex)) throw new Error("bad random");
  const next = clone(books);
  const bet = next.bets.find((b) => b.id === betId);
  if (!bet) throw new Error("missing bet");
  if (bet.status === "resolved") throw new Error("already resolved");
  if (bet.status === "rerequest") throw new Error("needs rerequest");
  const pocket = pocketFromByte(byte0(randomHex));
  if (pocket === "reject") {
    bet.status = "rerequest";
    return next;
  }
  const stake = BigInt(bet.stake);
  const payout = straightPayout(stake);
  const extra = payout - stake;
  bet.status = "resolved";
  bet.pocket = pocket;
  next.escrow = (BigInt(next.escrow) - stake).toString();
  next.reserved = (BigInt(next.reserved) - extra).toString();
  if (pocket === bet.number) {
    bet.payout = payout.toString();
  } else {
    bet.payout = "0";
    next.bank = (BigInt(next.bank) + stake + extra).toString();
  }
  return next;
}

export function reopen(books: Books, id: string): Books {
  const betId = u64(id, "id").toString();
  const next = clone(books);
  const bet = next.bets.find((b) => b.id === betId);
  if (!bet) throw new Error("missing bet");
  if (bet.status !== "rerequest") throw new Error("not rerequest");
  bet.status = "open";
  bet.pocket = null;
  return next;
}
