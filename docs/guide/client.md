# Client

The client is the starting point of configuring your app for interacting with the Fuel blockchain, it manages the connection states between your app and your users wallets.

## Configuration

### Chains

There are currently two testnets available on Fuel, `beta-1` and `beta-2`. The main difference between the two is the latter enables cross-chain messaging between Ethereum and Fuel.

Simply specify the chains you want your app to be able to interact with.

:::warning
Wallet events are not supported yet. As a result the first chain specified, i.e. `beta-1` in the example below, will be the only one your app will connect to for now.
:::

```ts {2}
const client = createClient({
  chains: ['beta-1', 'beta-2'],
});
```

If you have a chain running locally you want to connect to, specify `localhost` and it will connect to `http://127.0.0.1:4000/graphql`

```ts {2}
const client = createClient({
  chains: ['localhost'],
});
```

### QueryClient

Under the hood we use [TanStack Query](https://tanstack.com/query/latest) so we also expose the configuration to allow you to configure it if needed.

```ts {3-9}
const client = createClient({
  chains: ['beta-2'],
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  },
});
```

By default we use the following configuration

```ts
queryClientConfig = {
  defaultOptions: {
    queries: {
      cacheTime: 1_000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
},
```

Refer to the official [documentation](https://tanstack.com/query/v4/docs/react/reference/QueryClient) for a more detailed usage.
