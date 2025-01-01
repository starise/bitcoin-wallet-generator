// Andrea Brandi 2025 (ISC)
// Import required libraries
import * as ecc from "tiny-secp256k1";
import { BIP32Factory } from "bip32";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { initEccLib, payments } from "bitcoinjs-lib";

// Initialize ECC library and BIP32 factory
const bip32 = BIP32Factory(ecc);
initEccLib(ecc);

// Derivation paths
const SEGWIT_DERIVATION_PATH = `m/84'/0'/0'/0/0`;
const TAPROOT_DERIVATION_PATH = `m/86'/0'/0'/0/0`;

// Utility to convert a public key to x-only format
const toXOnly = (pubKey) => pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);

/**
 * Generates a new Bitcoin wallet with Taproot and native SegWit addresses.
 * @returns {Object} Wallet details including addresses, WIF, and mnemonic.
 */
function generateBitcoinWallet() {
  // Generate mnemonic and seed
  const mnemonic = generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonic);

  // Derive the root key
  const rootKey = bip32.fromSeed(seed);

  // Derive Taproot address
  const taprootNode = rootKey.derivePath(TAPROOT_DERIVATION_PATH);
  const taprootXOnlyPubKey = toXOnly(taprootNode.publicKey);
  const { address: taprootAddress } = payments.p2tr({
    internalPubkey: taprootXOnlyPubKey,
  });

  // Derive native SegWit address
  const segwitNode = rootKey.derivePath(SEGWIT_DERIVATION_PATH);
  const { address: segwitAddress } = payments.p2wpkh({
    pubkey: segwitNode.publicKey,
  });

  // Get current date and time
  const now = new Date();
  const creationDate = now.toISOString().split("T")[0];
  const creationTime = now.toTimeString().split(" ")[0];

  return {
    date: `${creationDate}, ${creationTime}`,
    taprootAddress,
    segwitAddress,
    wif: taprootNode.toWIF(), // WIF can be derived from either node
    mnemonic,
  };
}

// Generate the wallet and log the details
const wallet = generateBitcoinWallet();
const outputHead = `\nBitcoin Wallet (${wallet.date})\n-----`;
const taproot = `- Taproot Address: ${wallet.taprootAddress}`;
const segwit = `- Native SegWit (Bech32) Address: ${wallet.segwitAddress}`;
const walletWif = `- Private Key (WIF): ${wallet.wif}`;
const walletMnemonic = `- Mnemonic: ${wallet.mnemonic}`;
console.log(
  `${outputHead}\n${taproot}\n${segwit}\n${walletWif}\n${walletMnemonic}\n`,
);
