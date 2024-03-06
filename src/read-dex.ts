import { BN, formatBalance, } from '@polkadot/util';
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from '@polkadot/keyring';
import { Option, Vec } from '@polkadot/types';
import { Codec } from '@polkadot/types/types';
import { Balance } from '@polkadot/types/interfaces';
import { SignerOptions } from '@polkadot/api/submittable/types';

async function main() {
  const wsProvider = new WsProvider("ws://localhost:9944");
  const api = await ApiPromise.create({
    provider: wsProvider,
    types: {
      NativeOrAssetId: {
        _enum: {
          Native: null,
          Asset: "u32",
        },
      },
    },
    runtime: {
      AssetConversionApi: [
        {
          methods: {
            get_reserves: {
              description: "Get pool reserves",
              params: [
                {
                  name: "asset1",
                  type: "NativeOrAssetId",
                },
                {
                  name: "asset2",
                  type: "NativeOrAssetId",
                },
              ],
              type: "Option<(Balance,Balance)>",
            },
            quote_price_exact_tokens_for_tokens: {
              description: "Quote price: exact tokens for tokens",
              params: [
                {
                  name: "asset1",
                  type: "NativeOrAssetId",
                },
                {
                  name: "asset2",
                  type: "NativeOrAssetId",
                },
                {
                  name: "amount",
                  type: "u128",
                },
                {
                  name: "include_fee",
                  type: "bool",
                },
              ],
              type: "Option<(Balance)>",
            },
            quote_price_tokens_for_exact_tokens: {
              description: "Quote price: tokens for exact tokens",
              params: [
                {
                  name: "asset1",
                  type: "NativeOrAssetId",
                },
                {
                  name: "asset2",
                  type: "NativeOrAssetId",
                },
                {
                  name: "amount",
                  type: "u128",
                },
                {
                  name: "include_fee",
                  type: "bool",
                },
              ],
              type: "Option<(Balance)>",
            },
          },
          version: 1,
        },
      ],
    },
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

  //const formatter = (v: BN) => formatBalance(v, { decimals: 12, forceUnit: '-', withSi: false, locale: 'en', withZero: false});

  //const res = await api.call.assetConversionApi.getReserves<Option<Vec<Balance>>>("Native", { Asset: 1 })
  //if (!res.isSome) {
  //  throw new Error("Such Pool doesnt exist");
  //}
  //const lldReserves = formatter(res.unwrap()[0]);
  //const llmReserves = formatter(res.unwrap()[1]);
  //console.log({ lldReserves, llmReserves });


  //// pass true at the end to simulate actual trade, including slippage and fees
  //// pass false to get simple price - a.k.a. infinite liquidity and no fees
  //const rate= await api.call.assetConversionApi.quotePriceExactTokensForTokens<Option<Balance>>("Native", { Asset: 1 }, '1000000000000', true);
  //if (!rate.isSome) {
  //  throw new Error("Such Pool doesnt exist");
  //}
  //console.log(`Sell 1 LLD, get ${formatter(rate.unwrap())} LLM`)

  //const rate2 = await api.call.assetConversionApi.quotePriceTokensForExactTokens<Option<Balance>>("Native", { Asset: 1 }, '1000000000000', true);
  //if (!rate2.isSome) {
  //  throw new Error("Such Pool doesnt exist");
  //}
  //console.log(`Buy 1 LLM, pay ${formatter(rate2.unwrap())} LLD`)

  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
  const alice = keyring.addFromUri('//Alice');
  await api.tx.system.remark("asd").signAndSend(alice, { assetId: 1 });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
