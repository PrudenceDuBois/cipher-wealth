# Cipher Wealth 🔐💰

A privacy-preserving wealth management system built with **Fully Homomorphic Encryption (FHE)** using Zama's FHEVM protocol. Cipher Wealth enables users to manage their digital assets with complete privacy - deposits, withdrawals, and transfers remain encrypted on-chain, ensuring that sensitive financial data is never exposed.

## 🎥 Demo

**Live Demo**: [https://cipher-wealth.vercel.app/](https://cipher-wealth.vercel.app/)

**Video Demo**: [demo.mp4](./demo.mp4)

![Cipher Wealth](https://cipher-wealth.vercel.app/cipher-logo.svg)

## ✨ Features

- **🔒 Encrypted Balances**: All user balances are stored as encrypted values on-chain using FHE
- **💸 Private Deposits**: Deposit funds without revealing the amount to anyone
- **💰 Private Withdrawals**: Withdraw funds while keeping transaction amounts confidential
- **🔄 Private Transfers**: Send encrypted amounts to other users peer-to-peer
- **👁️ Selective Disclosure**: Only you can decrypt and view your own balance
- **🌐 Modern UI**: Beautiful, responsive Next.js frontend with Tailwind CSS
- **🦊 MetaMask Integration**: Seamless wallet connection with EIP-6963 support
- **⚡ Real-time Updates**: Instant balance updates after transactions

## 🏗️ Architecture

### Smart Contracts

- **CipherWealth.sol**: Main contract implementing encrypted wealth management
  - Encrypted balance storage using `euint64`
  - FHE operations for deposit, withdraw, and transfer
  - Access control for encrypted data

- **FHECounter.sol**: Example contract demonstrating FHE counter operations

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **ethers.js**: Ethereum interaction
- **@zama-fhe/relayer-sdk**: FHEVM client library
- **Shadcn/ui**: Modern UI components

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 20 or higher
- **pnpm**: Package manager (or npm/yarn)
- **MetaMask**: Browser extension for wallet connection

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PrudenceDuBois/cipher-wealth.git
   cd cipher-wealth
   ```

2. **Install dependencies**

   ```bash
   # Install contract dependencies
   pnpm install

   # Install frontend dependencies
   cd frontend
   pnpm install
   cd ..
   ```

3. **Set up environment variables**

   ```bash
   # Set your mnemonic for contract deployment
   npx hardhat vars set MNEMONIC

   # Set your Infura API key for network access
   npx hardhat vars set INFURA_API_KEY

   # Optional: Set Etherscan API key for contract verification
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

### Local Development

1. **Start a local FHEVM node**

   ```bash
   npx hardhat node
   ```

2. **Deploy contracts** (in a new terminal)

   ```bash
   npx hardhat deploy --network localhost
   ```

3. **Start the frontend** (in a new terminal)

   ```bash
   cd frontend
   pnpm dev
   ```

4. **Configure MetaMask**
   - Network Name: Hardhat
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency: ETH

5. **Open your browser**

   Navigate to `http://localhost:3000`

### Deploy to Sepolia Testnet

1. **Deploy contracts**

   ```bash
   npx hardhat deploy --network sepolia
   ```

2. **Update frontend configuration**

   The deployment addresses are automatically saved to `frontend/public/deployments/`

3. **Build and deploy frontend**

   ```bash
   cd frontend
   pnpm build
   ```

## 📁 Project Structure

```
cipher-wealth/
├── contracts/              # Smart contract source files
│   ├── CipherWealth.sol   # Main encrypted wealth contract
│   └── FHECounter.sol     # Example FHE counter contract
├── deploy/                # Deployment scripts
│   ├── deploy.ts          # FHECounter deployment
│   └── deploy_cipher_wealth.ts  # CipherWealth deployment
├── test/                  # Contract test files
│   ├── CipherWealth.ts
│   ├── CipherWealthSepolia.ts
│   ├── FHECounter.ts
│   └── FHECounterSepolia.ts
├── tasks/                 # Hardhat custom tasks
├── frontend/              # Next.js frontend application
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── fhevm/            # FHEVM integration utilities
│   ├── abi/              # Contract ABIs
│   └── public/           # Static assets
├── hardhat.config.ts     # Hardhat configuration
└── package.json          # Dependencies and scripts
```

## 📜 Available Scripts

### Contract Scripts

| Script             | Description                    |
| ------------------ | ------------------------------ |
| `pnpm compile`     | Compile all smart contracts    |
| `pnpm test`        | Run contract tests             |
| `pnpm coverage`    | Generate test coverage report  |
| `pnpm lint`        | Run Solidity linting           |
| `pnpm clean`       | Clean build artifacts          |

### Frontend Scripts

| Script             | Description                    |
| ------------------ | ------------------------------ |
| `pnpm dev`         | Start development server       |
| `pnpm build`       | Build for production           |
| `pnpm start`       | Start production server        |
| `pnpm lint`        | Run ESLint checks              |
| `pnpm test`        | Run Vitest tests               |

## 🔐 How It Works

### Encrypted Operations

1. **Deposit**: Users encrypt their deposit amount client-side and submit it to the contract. The contract adds this encrypted value to their encrypted balance.

2. **Withdraw**: Users encrypt their withdrawal amount, and the contract subtracts it from their encrypted balance.

3. **Transfer**: Users can send encrypted amounts to other addresses. The contract performs encrypted subtraction from the sender and encrypted addition to the recipient.

4. **View Balance**: Users can retrieve their encrypted balance and decrypt it client-side using their private key.

### Privacy Guarantees

- ✅ Transaction amounts are never visible on-chain
- ✅ User balances remain encrypted at all times
- ✅ Only the balance owner can decrypt their data
- ✅ Contract operations work on encrypted data without decryption
- ✅ Zero-knowledge proofs ensure transaction validity

## 🧪 Testing

### Run Contract Tests

```bash
# Test on local network
pnpm test

# Test on Sepolia testnet
npx hardhat test --network sepolia
```

### Run Frontend Tests

```bash
cd frontend
pnpm test
```

## 📚 Documentation

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [FHEVM Hardhat Setup](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup)
- [FHEVM Testing Guide](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)
- [@zama-fhe/relayer-sdk](https://docs.zama.ai/protocol/relayer-sdk-guides/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🛠️ Technology Stack

### Blockchain & Encryption
- **Solidity ^0.8.24**: Smart contract language
- **FHEVM**: Fully Homomorphic Encryption for EVM
- **Hardhat**: Development environment
- **ethers.js v6**: Ethereum library

### Frontend
- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Shadcn/ui**: UI components
- **Lucide React**: Icons

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/PrudenceDuBois/cipher-wealth/issues)
- **FHEVM Documentation**: [docs.zama.ai](https://docs.zama.ai)
- **Zama Community**: [Discord](https://discord.gg/zama)

## 🙏 Acknowledgments

Built with [Zama's FHEVM](https://www.zama.ai/fhevm) - bringing privacy to smart contracts through Fully Homomorphic Encryption.

---

**Built with 🔐 for privacy-preserving DeFi**
