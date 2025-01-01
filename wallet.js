// Andrea Brandi 2025 (ISC)
// Import required libraries
import * as ecc from "tiny-secp256k1";
import { BIP32Factory } from "bip32";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { initEccLib, payments } from "bitcoinjs-lib";

// Initialize ECC library and BIP32 factory
const bip32 = BIP32Factory(ecc);
initEccLib(ecc);

// First receiving address of first account
const DERIVATION_PATH = `m/86'/0'/0'/0/0`;
// Utility to convert a public key to x-only format
const toXOnly = (
  pubKey,
) => (pubKey.length === 32 ? pubKey : pubKey.slice(1, 33));

/**
 * Generates a new Taproot wallet.
 * @returns {Object} Wallet details including address, WIF, and mnemonic.
 */
function generateTaprootWallet() {
  // Generate mnemonic and seed
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);

  // Derive the root key and child key
  const rootKey = bip32.fromSeed(seed);
  const childNode = rootKey.derivePath(DERIVATION_PATH);

  // Derive x-only public key and create Taproot address
  const xOnlyPubKey = toXOnly(childNode.publicKey);
  const { address } = payments.p2tr({ internalPubkey: xOnlyPubKey });

  // Get current date and time
  const now = new Date();
  const creationDate = now.toISOString().split("T")[0];
  const creationTime = now.toTimeString().split(" ")[0];

  return {
    date: `${creationDate}, ${creationTime}`,
    address,
    wif: childNode.toWIF(),
    mnemonic,
  };
}

// Generate the wallet and log the details
const wallet = generateTaprootWallet();
const outputHead = `\nBitcoin Wallet (${wallet.date})\n-----`;
const taprootAddress = `- Taproot Address: ${wallet.address}`;
const walletWif = `- Private Key (WIF): ${wallet.wif}`;
const walletMnemonic = `- Mnemonic: ${wallet.mnemonic}`;
console.log(
  `${outputHead}\n${taprootAddress}\n${walletWif}\n${walletMnemonic}\n`,
);
