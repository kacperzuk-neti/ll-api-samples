import { ApiPromise, WsProvider } from "@polkadot/api";

const ENDPOINT = process.env.WS_ENDPOINT!;
const CONNECTIONS = parseInt(process.env.CONNECTIONS!);

async function startConnection() {
  const wsProvider = new WsProvider(ENDPOINT);
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.query.timestamp.now(() => {});
  await api.rpc.chain.subscribeNewHeads(() => {});
  while (true) {
    await api.derive.democracy.referendums();
    await api.derive.elections.info();
    await api.derive.council.votes();
    await sleep(5000 + Math.random()*5000);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  for (let i = 0; i < CONNECTIONS; i++) {
	  startConnection();
	  await sleep(100);
  }
}

main().catch(console.error)
