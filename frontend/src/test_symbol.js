import { Keypair, Account, Contract, TransactionBuilder, BASE_FEE } from '@stellar/stellar-sdk';
import { server, NETWORK_PASSPHRASE } from './lib/stellar.js';

// The token contract ID is usually in .env
// We can test with the native token contract ID or just any contract
const CROWDFUNDING_CONTRACT_ID = process.env.VITE_CROWDFUNDING_CONTRACT_ID;
const TOKEN_CONTRACT_ID = 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC'; // XLM on testnet

async function run() {
  console.log('Testing token contract symbol:', TOKEN_CONTRACT_ID);
  try {
    const simSource = Keypair.random().publicKey();
    const account = new Account(simSource, '0');
    const contract = new Contract(TOKEN_CONTRACT_ID);

    // Get symbol
    const symTx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(contract.call('symbol'))
      .setTimeout(30)
      .build();

    console.log('Simulating transaction...');
    const symSim = await server.simulateTransaction(symTx);
    console.log('Simulation result:', JSON.stringify(symSim, null, 2));

    if (symSim.result) {
        const { scValToNative } = await import('@stellar/stellar-sdk');
        console.log('retval XDR:', symSim.result.retval.toXDR('base64'));
        const symbol = scValToNative(symSim.result.retval);
        console.log('Symbol:', symbol);
    }
  } catch (err) {
    console.error('Error in getTokenAssetInfo test:', err);
  }
}

run();
