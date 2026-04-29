# 🚀 StellarCrowdfund — Decentralized Crowdfunding on Stellar

**[🌐 Live Demo: https://stellarcrowdfund.vercel.app/](https://stellarcrowdfund.vercel.app/)**

A premium, full-stack crowdfunding platform built on the **Stellar Network** using **Soroban Smart Contracts**. Create campaigns, fund projects, and manage the entire crowdfunding lifecycle — fully on-chain.

![Stellar Crowdfunding](screenshot/Dashboard.png)

### 🎥 [Watch the Demo Video on Google Drive](https://drive.google.com/file/d/1rTyOkcp3pJO_ysWP5KIWBOXlvMEO_ufS/view?usp=sharing)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏗️ **Create Campaigns** | Define titles, descriptions, funding goals, and deadlines |
| 💎 **Fund Projects** | Contribute tokens to active campaigns via Freighter wallet |
| 📊 **Real-time Tracking** | Live progress bars, countdown timers, and funding stats |
| 🔐 **Safe Withdrawals** | Creators can only withdraw if the campaign meets its goal |
| 💸 **Automatic Refunds** | Backers can claim full refunds if a campaign fails |
| 🔗 **Auto Trustline** | Automatically sets up token trustlines before first funding |
| 🎨 **Premium UI** | Glassmorphic dark theme with smooth animations |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |
| ⛽ **Fee Sponsorship** | **Black Belt Feature:** Supports gasless transactions via Fee Bumps |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Smart Contracts** | Rust, Soroban SDK |
| **Frontend** | React 18 (Vite) |
| **Blockchain SDK** | `@stellar/stellar-sdk` v13 |
| **Wallet** | `@stellar/freighter-api` v6 |
| **Styling** | Vanilla CSS, HSL design tokens, Glassmorphism |
| **Network** | Stellar Testnet (Soroban RPC) |

---

## 📂 Project Structure

```
StellarCrowdfund/
├── contracts/
│   └── crowdfunding/src/lib.rs     # Soroban smart contract (Rust)
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, CampaignCard, FundModal, Toast
│   │   ├── hooks/            # useWallet, useToast
│   │   ├── lib/              # stellar.js (SDK), contract.js (contract calls)
│   │   ├── pages/            # HomePage, CampaignDetailPage, CreateCampaignPage, MyActivityPage
│   │   ├── styles/           # Global CSS design system
│   │   └── App.jsx           # Main application router
│   └── .env                  # Contract IDs & network config
├── scripts/
│   ├── deploy.sh             # Full deployment automation
│   └── build.sh              # Contract build script
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites

- [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools) installed and configured
- [Rust](https://www.rust-lang.org/) with `wasm32-unknown-unknown` target
- [Node.js](https://nodejs.org/) v18+ & npm
- [Freighter Wallet](https://www.freighter.app/) browser extension (set to **Testnet**)

### 1. Clone & Deploy Contracts

```bash
git clone <your-repo-url>
cd StellarCrowdfund

# Deploy token + crowdfunding contracts to Stellar Testnet
bash scripts/deploy.sh
```

This will:
- Build the Soroban smart contract
- Deploy a token contract and the crowdfunding contract
- Generate the frontend `.env` file with contract IDs

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:3000**

### 3. Mint Test Tokens

Before users can fund campaigns, they need **FUND** tokens. The token trustline is automatically created by the frontend when a user first tries to fund a campaign.

Mint tokens to a wallet using the CLI:

**Windows (PowerShell):**
```powershell
stellar contract invoke --id CBCSQZIQHWUF6Z2LZPYA6QIYEFUUT7FF7DWEVOQBE2HNOTONMHVYPJ3L --source-account crowdfund-deployer --network testnet -- mint --to <USER_WALLET_ADDRESS> --amount 10000000000
```

**Linux / macOS:**
```bash
stellar contract invoke \
  --id CBCSQZIQHWUF6Z2LZPYA6QIYEFUUT7FF7DWEVOQBE2HNOTONMHVYPJ3L \
  --source-account crowdfund-deployer \
  --network testnet \
  -- mint \
  --to <USER_WALLET_ADDRESS> \
  --amount 10000000000
```

> **Note:** `10000000000` = 1,000 tokens (7 decimal places). The `crowdfund-deployer` account is the token admin.

### 4. Use the Platform

1. Open **http://localhost:3000**
2. Click **Connect Wallet** → Freighter will prompt for access
3. Ensure Freighter is set to **Testnet**
4. **Create** a campaign with title, description, goal, and deadline
5. **Fund** campaigns using the 💎 Fund button
6. **Withdraw** funds (if you're the creator and the goal was met)
7. **Refund** your contribution (if the campaign failed)

---

## 📜 Smart Contract API

### Write Functions (require signing)

| Function | Parameters | Description |
|----------|-----------|-------------|
| `create_campaign` | `creator, title, description, goal, deadline` | Launch a new crowdfunding campaign |
| `fund` | `campaign_id, funder, amount` | Contribute tokens to a campaign |
| `withdraw` | `campaign_id, caller` | Creator withdraws funds (goal must be met) |
| `refund` | `campaign_id, caller` | Backer reclaims funds (campaign must have failed) |

### Read Functions (simulation only)

| Function | Parameters | Description |
|----------|-----------|-------------|
| `get_campaign` | `campaign_id` | Get details of a single campaign |
| `get_all_campaigns` | — | List all campaigns on-chain |
| `get_contribution` | `campaign_id, funder` | Check a user's contribution to a campaign |

### Campaign Status Lifecycle

```
Active  →  Success (goal met & deadline passed)  →  Withdrawn
   ↓
Failed (deadline passed & goal not met)  →  Refunded
```

---

## 🔧 Environment Variables

Create a `.env` file in `frontend/` (auto-generated by `deploy.sh`):

```env
VITE_CROWDFUNDING_CONTRACT_ID=CB6PDLFUQCDHNYBX3MLNWIXDAPAQVITUWRCLUETRJX2Z3KURJX5NQRV5
VITE_TOKEN_CONTRACT_ID=CBCSQZIQHWUF6Z2LZPYA6QIYEFUUT7FF7DWEVOQBE2HNOTONMHVYPJ3L
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
VITE_RPC_URL=https://soroban-testnet.stellar.org
```

| Variable | Description |
|----------|-------------|
| `VITE_CROWDFUNDING_CONTRACT_ID` | Deployed crowdfunding smart contract address |
| `VITE_TOKEN_CONTRACT_ID` | FUND token contract (SAC) address |
| `VITE_NETWORK_PASSPHRASE` | Stellar network passphrase (Testnet) |
| `VITE_RPC_URL` | Soroban RPC endpoint |

---

## 🏗️ Architecture

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────────┐
│   Freighter   │◄───►│   React App     │◄───►│  Soroban RPC     │
│   Wallet      │     │   (Vite)        │     │  (Testnet)       │
└──────────────┘     ├─────────────────┤     ├──────────────────┤
                     │ • stellar.js    │     │ • Crowdfunding   │
                     │   (SDK wrapper) │     │   Contract       │
                     │ • contract.js   │     │ • Token Contract │
                     │   (contract API)│     │   (SAC)          │
                     └─────────────────┘     └──────────────────┘
```

**Key Design Decisions:**
- **Raw JSON-RPC** for `sendTransaction` and `getTransaction` to avoid SDK v13 XDR parsing issues with Soroban envelope types
- **Auto trustline setup** — detects missing trustlines and creates them via Freighter before funding
- **`server.prepareTransaction()`** for contract call assembly (simulation + assembly in one step)
- **Read-only simulations** use `Keypair.random()` to avoid needing a funded account

---

## 📸 Screenshots

| Home Page | Campaign Grid | Stellar |
|-----------|--------------|---------|
| ![Home](screenshot/Dashboard.png) | ![Campaigns](screenshot/Dashboard_2.png) | ![Stellar](screenshot/Stellar.png) |

---

## 🌟 Verified Testnet Users & Feedback

We've successfully tested the platform on the Stellar Testnet with multiple users who provided a **5/5 overall experience rating**! 

**Key highlights from our 5+ verified users:**
- Praise for the **ease of creating campaigns & funding projects**.
- Appreciation for the **seamless integration with Freighter**.
- High marks for the **security and transparency** of the platform.
- Love for the premium **User Interface & Design**.

[📊 View the raw user feedback and testnet verification here](https://docs.google.com/spreadsheets/d/1FnipA4BZrLnwiIm9xticozmAsi24sTWtKkvL9ZkW8qI/edit?usp=sharing)

**🏆 Verified Testnet Addresses:**
- `GAOROSU2N36UHKB6WQVE7GHTFMDH2FH62OGEXRH7YH6RJ5R4GZHDBTLG`
- `GCPBPHMV4ITVABMXRYJLXF2UVSPUPAHEV47345OMY7WX625SU7QJPFOW`
- `GCTR3T4QKW4APUEKU2U6V32J7JCJOM2YHJZYCOV2XTE3E7YTRRRY2AOS`
- `GA3UD3SA7RAG3TYSPZCOOHTABK7GXMHQ2IYZ5M5OXRITQZFEZAAAOW4B`
- `GCBCZQYLIENVZGCGYZ3I7LTFIZDEAFGLV2BLBAPVYPPHV2XPCF5URS3Z`
- `GDFNZCMIIP7RUGI3TWVFOKKI3S3CPLP4AR6IJ4RUAETG36AEIEWUWUNL`
- `GCPBPHMV4ITVABMXRYJLXFZUVSPUPAHEV473450MY7WX625SU7QJPFOW`
- `GCUMAPN3QCOVWGPSIYW2J3TI3TLVUJ36JFSJSXZ5PUEWFPDAL72AEMYY`
- `GA4NAGVEH6PBKPJ73ZM2ZREIP2XBH75BZEP5MTZPOTWNP626WWXZPYZP`
- `GBUE5PXGLCUMRHNOD4QGTYQ6YVA7FDPVM5Q7ES6G57TBYYW6ROYGWF3C`
- `GDXYGFVWN773LQ7IU337Z2ZM6UTRMBR64GZW4LQW3D4O6TDG3ESH6OLL`
- `GAOAOKPRRGHSDK3RSW6GRLMRM3SPCFKVWGNOBZZ335ALOXG7F77VNU6P`
- `GBSE23OSXISTSEIQ5KD6H25SDWLG5RSMCZZH5B7ONBN4NB26KCGOCPX5`
- `GDUFAQ3SYIADX7VA2X4AKKEORY6CXF2C76PZMOAIQ34VSZW2HRBO5IKZ`
- `GDFN2CMIIP7RUGI3TWVFOKKI3S3CPLP4AR6IJ4RUAETG36AEIEWUWUNL`
- `GBF4TVMSZHNV5HJUGX37FMRHGFJA4P2HXY5PVCSZN6OJ6W6K6IULJZAV`
- `GATY3WFEUFUV3A4GGAXMB7TVOWX7HVLPO7ZJBTS7DOCEO76ZQGSMU4RE`
- `GC3ICBUWOXJ3DBIOSUF7DNEVGKJR3S5HNEPADMY2SFLJRJUIZGGAESFN`

---

## 🔧 Troubleshooting

- **Transaction Failed:** Ensure you have enough tokens in your balance. If you are a creator, ensure the deadline has passed before withdrawing.
- **Freighter Not Connecting:** Make sure the Freighter extension is installed and set to **Testnet** in the settings.
- **Contract Error:** Refresh the page and try again. The Testnet can occasionally be slow or unstable.

---

## 🥋 Black Belt Features

### ⛽ Fee Sponsorship (Gasless Transactions)
StellarCrowdfund supports **Fee Sponsorship** using Stellar's **Fee Bump** transaction type. This allows the platform to pay for transaction fees in XLM, meaning users can participate without holding any XLM in their wallet!

**How to enable:**
1. Open `frontend/.env`.
2. Add `VITE_SPONSOR_SECRET_KEY=YOUR_STELLAR_SECRET_KEY`.
3. The platform will now automatically wrap user transactions in a fee-bump signed by this sponsor account.

---

## 🚀 Next Phase Improvements

---

## ❓ FAQ

**Q: Do I need XLM to use this platform?**
A: Thanks to our **Fee Sponsorship** feature, you don't need XLM for transaction fees! However, you still need the funding tokens to contribute to campaigns.

**Q: What happens if a campaign fails?**
A: If a campaign does not reach its goal by the deadline, all backers can claim a full refund of their contributions.

**Q: Is my wallet secure?**
A: Yes, we use **Freighter**, Stellar's official non-custodial wallet. Your private keys never leave your device.

---

---

## 🤝 How to Contribute

We welcome contributions from the community! Whether it's reporting a bug, suggesting a feature, or submitting a pull request, your help is appreciated.

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---
2. **Advanced Campaign Discovery:** Implementing search, category filters, and sorting (e.g., "Ending Soon", "Most Funded") to make it even easier to find and fund projects.
3. **Multi-Asset Funding:** Allowing backers to fund campaigns using Stellar-based **USDC** alongside our native FUND tokens.
4. **Social Integrations:** Adding one-click social sharing buttons to help creators promote their campaigns organically.
5. **Rich Text Descriptions:** Enabling markdown support for campaign creators to add images and formatted text to their project descriptions.

> 🔗 **Commit Reference:** Check out the commit incorporating testnet user validation and this roadmap: [`bb447e7`](https://github.com/Sayandeep-the-coder/StellarCrowdfund/commit/bb447e72910371971e3b7d62f8785fdc14bcf6df)

---

## 🔗 Resources

- **[Crowdfund Contract Explorer](https://lab.stellar.org/smart-contracts/contract-explorer?$=network$id=testnet&label=Testnet&horizonUrl=https:////horizon-testnet.stellar.org&rpcUrl=https:////soroban-testnet.stellar.org&passphrase=Test%20SDF%20Network%20/;%20September%202015;&smartContracts$explorer$contractId=CB6PDLFUQCDHNYBX3MLNWIXDAPAQVITUWRCLUETRJX2Z3KURJX5NQRV5;;)**: Interact with the core Crowdfunding contract on-chain.
- **[FUND Token Explorer](https://lab.stellar.org/smart-contracts/contract-explorer?$=network$id=testnet&label=Testnet&horizonUrl=https:////horizon-testnet.stellar.org&rpcUrl=https:////soroban-testnet.stellar.org&passphrase=Test%20SDF%20Network%20/;%20September%202015;&smartContracts$explorer$contractId=CBCSQZIQHWUF6Z2LZPYA6QIYEFUUT7FF7DWEVOQBE2HNOTONMHVYPJ3L;;)**: Interact with the FUND token contract directly via the official Stellar Lab.

---

## 📄 License

Built with ❤️ for the Stellar Ecosystem.
