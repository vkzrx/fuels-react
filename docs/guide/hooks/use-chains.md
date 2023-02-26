# useChains

Hook for getting the current chain your app is connect to and all configured chains.

:::warning
Wallet events are not supported yet so switching networks will not be caught
:::

## Usage

```tsx
import { useChains } from 'fuels-react';

function App() {
  const { currentChain, chains } = useChains();
  return (
    <>
      <h2>Current chain</h2>
      <div>Name: {currentChain.name}</div>
      <div>URL: {currentChain.url}</div>
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

type UseChainsResult = {
  currentChain: Chain | null;
  chains: Chain[] | null;
};
```
