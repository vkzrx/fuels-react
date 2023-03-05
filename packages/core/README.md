# Fuel React library

This repository is at its early stage so things might not work as expected.

Note it's been tested only with a `CSR` app.

A demo is available [https://fuels-react-vite.vercel.app](https://fuels-react-vite.vercel.app/)

## Documentation

The documentation is available at [fuels-react.com](https://fuels-react.com)

## Getting started

### Installation

```
$ pnpm add fuels-react

# use yarn if you prefer
$ yarn add fuels-react

# or npm
$ npm install fuels-react
```

### Setup

Configure your client then wrap your application inside `FuelProvider`.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FuelProvider, createClient } from 'fuels-react';
import App from './App';

const client = createClient({ chains: ['beta-2'] });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FuelProvider client={client}>
      <App />
    </FuelProvider>
  </React.StrictMode>,
);
```

Then you are ready to go.

Checkout the example [`./examples/vite`](./examples/vite) for a more detailed usage

```tsx
import { useWallet } from 'fuels-react';

function MyComponent() {
  const { address, status, connect, disconnect, signMessage, transfer } = useWallet();
  ...
}
```
