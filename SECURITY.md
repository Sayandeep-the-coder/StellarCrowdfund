# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

## Security Checklist (Completed)

The following security measures have been implemented and verified:
- [x] **Smart Contract Audit**: Internal review of Soroban contract logic.
- [x] **Reentrancy Protection**: Verified that withdrawal logic follows the checks-effects-interactions pattern.
- [x] **Input Validation**: All contract parameters (goals, deadlines) are validated on-chain.
- [x] **Environment Security**: Sensitive contract IDs and network passphrases are managed via `.env`.
- [x] **Wallet Integration**: Used `@stellar/freighter-api` for secure transaction signing.
- [x] **Sanitization**: Frontend inputs are sanitized before being passed to contract calls.
- [x] **Secure Deployment**: Contracts deployed to Testnet with proper admin controls.

