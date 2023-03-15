import { defineConfig } from 'vitepress';
import { version } from '../../packages/core/package.json';

export default defineConfig({
  title: 'Fuels React',
  description: 'React Library for the Fuel Blockchain',
  lang: 'en-US',
  lastUpdated: true,
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Fuels React ⚡' }],
    ['meta', { property: 'og:url', content: 'https://fuels-react.com' }],
    ['meta', { property: 'og:description', content: 'React Library for the Fuel Blockchain' }],
    ['meta', { property: 'og:image', content: 'https://fuels-react.com/preview.png' }],
    ['meta', { name: 'twitter:url', content: 'https://fuels-react.com' }],
    ['meta', { name: 'twitter:title', content: 'Fuels React ⚡' }],
    ['meta', { name: 'twitter:description', content: 'React Library for the Fuel Blockchain' }],
    ['meta', { name: 'twitter:site', content: '@0xYami9' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://fuels-react.com/preview.png' }],
  ],
  themeConfig: {
    siteTitle: 'Fuels React',
    editLink: {
      text: 'Suggest changes to this page',
      pattern: 'https://github.com/0xYami/fuels-react/edit/main/docs/:path',
    },
    algolia: {
      appId: '4F32R5K9VK',
      apiKey: '36704de0ab75b163a0e20e183108a71f',
      indexName: 'fuels-react',
    },
    outline: [2, 3],
    nav: [
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'Cookbook', link: '/cookbook/recipes', activeMatch: '/cookbook/' },
      {
        text: 'Playgrounds',
        items: [
          {
            text: 'Vite',
            link: 'https://stackblitz.com/fork/github/0xYami/fuels-react/tree/main/playgrounds/vite',
          },
          {
            text: 'Next',
            link: 'https://stackblitz.com/fork/github/0xYami/fuels-react/tree/main/playgrounds/next',
          },
        ],
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
              { text: 'useBlockNumber', link: '/guide/hooks/use-block-number' },
              {
                text: 'useBlockWithTransactions',
                link: '/guide/hooks/use-block-with-transactions',
              },
              { text: 'useChains', link: '/guide/hooks/use-chains' },
              { text: 'useCoins', link: '/guide/hooks/use-coins' },
              { text: 'useConnect', link: '/guide/hooks/use-connect' },
              { text: 'useContract', link: '/guide/hooks/use-contract' },
              { text: 'useDisconnect', link: '/guide/hooks/use-disconnect' },
              { text: 'useMessages', link: '/guide/hooks/use-messages' },
              { text: 'useProvider', link: '/guide/hooks/use-provider' },
              { text: 'useSignMessage', link: '/guide/hooks/use-sign-message' },
              { text: 'useSendTransaction', link: '/guide/hooks/use-send-transaction' },
              { text: 'useTransaction', link: '/guide/hooks/use-transaction' },
              { text: 'useTransactionCost', link: '/guide/hooks/use-transaction-cost' },
              { text: 'useWallet', link: '/guide/hooks/use-wallet' },
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
