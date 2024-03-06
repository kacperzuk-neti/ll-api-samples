# Setup:

```
yarn && yarn build
```

# Load testing RPC node:

```
env CONNECTIONS=1000 WS_ENDPOINT=ws://localhost:9944 node --max-old-space-size=16384 dist/kill-it-with-love.js
```