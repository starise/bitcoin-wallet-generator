# Bitcoin Taproot & Native SegWit Wallet Address Generator

Generate **Bitcoin Taproot wallet address** and **Bitcoin Native SegWit address**  (Bech32) directly from the command line using [Node.js](https://nodejs.org/en/download). It's designed for simplicity, privacy, and compatibility.

## Features

- No Bitcoin Core or any other wallet software required.
- No internet connection required during wallet generation.
- Output both Taproot address (P2TR) and Native SegWit address (P2WPKH).
- Output Private Key (in WIF format) and Mnemonic Phrase for wallet recovery.

## Usage

With Node.js installed on your machine. Open a terminal or command prompt in the directory containing the script `wallet.js` and run it with node.

```sh
node '.\wallet.js'
```

## Example output

```
Bitcoin Wallet (2025-01-01, 19:25:04)
-----
- Taproot Address: bc1p78rwcjfulynllrats0qj6a9yyk3a0m7n6slnahz24duteuzwcygs844jc0
- Native SegWit (Bech32) Address: bc1q8gwrl03qcgfrv66fgz0wl6n6vvspy53ec647nd
- Private Key (WIF): KyykaCy888TQm7TX7mYb4SYzR7cRcTXdQnFAsGHv1pgZgg8apcEj
- Mnemonic: egg comfort increase stay keep million gallery between organ jacket helmet offer
```

## Security considerations

- Keep private keys and mnemonics safe. Anyone can control your funds with these.
- Do not run this script on potentially compromised or untrusted systems.
- For better security, disconnect your device from the internet while generating wallets.

## Compatibility notes

- Taproot addresses are compatible with wallets and exchanges with P2TR (Pay-to-Taproot) support.
- Native SegWit addresses ensure better compatibility with older wallets with P2WPKH support.
