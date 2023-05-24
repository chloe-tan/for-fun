## Fun Wallet App

**Overview**

- Demo wallet app utilizing FunSDK 
- Perform simple token swaps between `eth` / `dai` / `usdc` tokens on the `goerli` ethereum testnet
- Check it out: https://for-fun-chloe.vercel.app 👀 

**Implementation**
![Actual Implementation Images](https://github.com/chloe-tan/for-fun/assets/95644202/304d104f-0a2a-48d3-9f1d-d33f7d9b7a5a)


## Resources & References
1. Process Documentation by @chloe-tan
3. [Fun Documentation](https://docs.fun.xyz/)
4. [Fun Demo App Reference](https://demo.fun.xyz/)
5. [Figma Design Reference](https://www.figma.com/file/xZDVdL7pkbgJPTtU6GH4mi/Untitled?type=design&node-id=0%3A43&t=o7xdSZpgj7AdHBmf-1)

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

