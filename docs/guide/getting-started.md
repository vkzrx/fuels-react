# Getting Started

This section will guide you through the installation and setup of `fuels-react`. You can also try it online on [StackBlitz](https://stackblitz.com/fork/github/0xYami/fuels-react/tree/main/playgrounds/vite). It spins up in a few seconds a Vite project with `fuels-react` already installed and set up.

:::warning
This library is currently in `pre-alpha`. It provides core features to develop on Fuel but things might change or break between a release and another.

It only supports `CSR` for now.
:::

## Installation

With `pnpm`

```bash
$ pnpm add fuels-react
```

With `yarn`

```bash
$ yarn add fuels-react
```

With `npm`

```bash
$ npm install fuels-react
```

## Setup

Create a `Client` instance and pass the chains you want your app to connect to.

:::warning
Wallet events are not supported yet so switching network will not be caught
:::

```ts
import { createClient } from 'fuels-react';

const client = createClient({ chains: ['beta-2'] });
```

Wrap your app inside the `FuelProvider`

```tsx {1,7,9}
import { createClient, FuelProvider } from 'fuels-react';

const client = createClient({ chains: ['beta-2'] });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FuelProvider client={client}>
      <App />
    </FuelProvider>
  </React.StrictMode>,
);
```

## Usage

Then you are ready to go, simply import the hooks you need.

```tsx
import { useWallet } from 'fuels-react';

function App() {
  const wallet = useWallet();
  return (
    <div>
      <div>Status: {wallet.status}</div>
      {wallet.isConnected ? (
        <button onClick={wallet.disconnect}>Disconnect</button>
      ) : (
        <button onClick={wallet.connect}>Connect</button>
      )}
    </div>
  );
}
```
