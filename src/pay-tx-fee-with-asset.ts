import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from '@polkadot/keyring';

async function main() {
  const wsProvider = new WsProvider("ws://localhost:9944");
  const api = await ApiPromise.create({
    provider: wsProvider,
    signedExtensions: {
      ChargeAssetTxPayment: {
        extrinsic: {
          tip: 'Compact<Balance>',
          assetId: 'Option<u32>'
        },
        payload: {}
      }
    }
  });


  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
  const alice = keyring.addFromUri('//Alice');

  // this transaction will be paid with LLD
  //await api.tx.system.remark("asd").signAndSend(alice);

  // this transaction will be paid with LLD
  //await api.tx.system.remark("asd").signAndSend(alice, { assetId: undefined });

  // this transaction will be paid with LLM
  await api.tx.system.remark("asd").signAndSend(alice, { assetId: 1 });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
