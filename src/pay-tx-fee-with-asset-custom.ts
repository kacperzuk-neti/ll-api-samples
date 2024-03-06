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
  const custom = keyring.addFromUri('dial moral journey pizza equip ribbon dash matrix sustain cool hunt casual');

  await api.tx.system.remark("asd").signAndSend(custom, { assetId: 1 });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
