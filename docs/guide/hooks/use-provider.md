# useProvider

Hook for getting the Fuel provider and the chains your app is configured to connect to.

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

## Example

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/github/0xYami/fuels-react/blob/main/examples/providers/provider?embed=1&file=src/App.tsx&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>
