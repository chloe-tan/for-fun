# Fun Wallet App

## Overview

- Demo wallet app utilizing FunSDK 
- Perform simple token swaps between `eth` / `dai` / `usdc` tokens on the `goerli` ethereum testnet
- **Check it out @ [https://for-fun-chloe.vercel.app](https://for-fun-chloe.vercel.app/)**
![Actual Implementation Images](https://github.com/chloe-tan/for-fun/assets/95644202/d241625c-ad78-4bc8-9db9-18784da5c38b)

## App use-cases

- [x] User can view their wallet summary  
- [x] User can view their individual token balances
- [x] User can perform a token swap using their available balances
- [x] User can choose to view the submitted transaction on a block explorer

## Demos

1. Wallet summary 

https://github.com/chloe-tan/for-fun/assets/95644202/92332cbc-459b-4c1d-871d-81461fbd37b5

3. Performing a token swap

https://github.com/chloe-tan/for-fun/assets/95644202/3ae8bf12-3b3d-4f6d-b156-68a007caaef1

4. Unsupported page notices

https://github.com/chloe-tan/for-fun/assets/95644202/efc7f689-94b4-43f7-9e19-99a0db7c6dc7


## Development setup

First, get the environment variables from @chloe-tan and place them in a `.env` file in the root folder:
```env
ENV=development
FUN_ADDRESS=SOME_FUN_ADDRESS
FUN_PRIVATE_KEY=SOME_FUN_PRIVATE_KEY
FUN_API_KEY=SOME_FUN_API_KEY
WALLET_INDEX=SOME_WALLET_INDEX
ETHERSCAN_API_KEY=SOME_ETHERSCAN_API_KEY
```
- You may generate your own `ETHERSCAN_API_KEY` by creating an [etherscan account](https://etherscan.io) and following the instructions [here](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics#creating-an-api-key)

Then, install relevent repo dependencies:
```bash
yarn install
```

Finally, run the development server:

```bash
yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Vercel integration

This app is also automatically deployed on vercel with every new commit to `main` (production) and/or PRs opened (preview).

## Resources & References
1. Process Documentation by @chloe-tan
3. [Fun Documentation](https://docs.fun.xyz/)
4. [Fun Demo App Reference](https://demo.fun.xyz/)
5. Figma Design
