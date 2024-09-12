# DappIde : generative AI case study

This is not to be put in production.

This is a study -and not more- to understand how AI can
1. help to develop an application, thanks to [v0.dev](https://v0.dev) and [Cursor](https://www.cursor.com/);
2. be integrated into the application logic thanks to [OpanAI API](https://openai.com/api/) and its dedicated [Node library](https://www.npmjs.com/package/openai).

## DappAI
This is Web App demonstrating AI usage to help user to develop their Dapp with iExec SDK.

### System prompt
System prompt is defined in [app/api/chat/route.ts](https://github.com/lodygens/dappide/blob/069a44a00049f3cd77dfcad4bec235edb06f5271/src/app/api/chat/route.ts#L23]

### V0
Used VO prompt 
"I want to write a web app as an IDE to help developer to write their decentralized appliation with iExec SDK. The UI style should be retro, like Apple 2e"

## Usage

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
