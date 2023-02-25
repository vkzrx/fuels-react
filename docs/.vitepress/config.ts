import { defineConfig } from 'vitepress';
import { version } from '../../packages/core/package.json';

export default defineConfig({
  title: 'Fuels React',
  cleanUrls: true,
  themeConfig: {
    siteTitle: 'Fuels React',
    algolia: {
      appId: '',
      apiKey: '',
      indexName: '',
    },
    outline: [2, 3],
    nav: [
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'Cookbook', link: '/cookbook/recipes', activeMatch: '/cookbook/' },
      {
        text: 'Playground',
        link: 'https://stackblitz.com/fork/github/0xYami/fuels-react/tree/main/playgrounds/vite',
      },
      {
        text: `v${version}`,
        items: [{ text: 'Release Notes', link: 'https://github.com/0xYami/fuels-react/releases' }],
      },
    ],
    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/0xYami9' },
      { icon: 'github', link: 'https://github.com/0xYami/fuels-react' },
      { icon: 'discord', link: 'https://discord.com/invite/xfpK4Pe' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [{ text: 'Getting Started', link: '/guide/getting-started' }],
      },
      {
        text: 'Core Features',
        items: [
          { text: 'Client', link: '/guide/client' },
          {
            text: 'Hooks',
            collapsed: false,
            items: [
              { text: 'useBalance', link: '/guide/hooks/use-balance' },
              { text: 'useBalances', link: '/guide/hooks/use-balances' },
              { text: 'useBlock', link: '/guide/hooks/use-block' },
              {
                text: 'useBlockWithTransactions',
                link: '/guide/hooks/use-block-with-transactions',
              },
              { text: 'useChains', link: '/guide/hooks/use-chains' },
              { text: 'useConnect', link: '/guide/hooks/use-connect' },
              { text: 'useContract', link: '/guide/hooks/use-contract' },
              { text: 'useDisconnect', link: '/guide/hooks/use-disconnect' },
              { text: 'useLatestBlockNumber', link: '/guide/hooks/use-latest-block-number' },
              { text: 'useProvider', link: '/guide/hooks/use-provider' },
              { text: 'useSignMessage', link: '/guide/hooks/use-sign-message' },
              { text: 'useTransaction', link: '/guide/hooks/use-transaction' },
              { text: 'useTransactionCost', link: '/guide/hooks/use-transaction-cost' },
            ],
          },
        ],
      },
      {
        text: 'Cookbook',
        items: [{ text: 'Recipes', link: '/cookbook/recipes' }],
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present 0xYami & Fuel Contributors',
    },
  },
});
