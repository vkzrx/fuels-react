# useProvider

Hook for getting the Fuel provider and the chains your app is configured to connect to.

:::warning
Wallet events are not supported yet so the `provider` will always be connected to the first chain you passed to your client.
:::

## Usage

```tsx
import { useProvider } from 'fuels-react';

function App() {
  const { provider, chains } = useProvider();
  return (
    <>
      <div>Current chain URL: {provider.url}</div>
      <h2>Configured chains</h2>
      {chains.map((chain) => (
        <div key={chain.name}>
          <div>Name: {chain.name}</div>
          <div>URL: {chain.url}</div>
        </div>
      ))}
    </>
  );
}
```

## Return Type

```ts
type Chain = {
  name: string;
  url: string;
};

type UseProviderResult = {
  provider: Provider;
  chains: Chain[] | null;
};
```
