import { registerWallet } from "./register.js";
import { GhostWallet } from "./wallet.js";
import type { Ghost } from "./window.js";

export type { WalletIcon } from "@wallet-standard/base";
export type { Ghost, GhostWallet };

export function initialize(ghost: Ghost): void {
  registerWallet(new GhostWallet(ghost));
}
