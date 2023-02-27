# useWallet

Hook for getting the user wallet information.

## Usage

```tsx
import { useWallet } from 'fuels-react';

function App() {
  const wallet = useWallet();
  return (
    <>
      <div>address: {wallet.address}</div>
      <div>status: {wallet.status}</div>
      {wallet.isConnected ? (
        <button onClick={wallet.disconnect}>Disconnect</button>
      ) : (
        <button onClick={wallet.connect}>Connect</button>
      )}
    </>
  );
}
```

## Configuration

```ts
type UseWalletConfig = {
  onConnect?: ((data: void, variables: void) => void) | undefined;
  onDisconnect?: ((data: void, variables: void) => void) | undefined;
};
```

### onConnect (optional)

`type: ((data: void, variables: void) => void) | undefined`

Callback to trigger a `side-effect` once the user wallet is connected to your app.

```tsx {5-7}
import { useWallet } from 'fuels-react';

function App() {
  const { data, signMessage } = useWallet({
    onConnect: () => {
      alert('User connected');
    },
  });
}
```

### onDisconnect (optional)

`type: ((data: void, variables: void) => void) | undefined`

Callback to trigger a `side-effect` once the user wallet is disconnected from your app.

```tsx {5-7}
import { useWallet } from 'fuels-react';

function App() {
  const { data, signMessage } = useWallet({
    onDisconnect: () => {
      alert('User disconnected');
    },
  });
}
```

## Return Type

```ts
type UseWalletResult = {
  address: string | undefined;
  status: 'connected' | 'connecting' | 'disconnected' | 'disconnecting' | 'locked';
  isConnected: boolean;
  isDisconnected: boolean;
  connect: () => void;
  connectAsync: () => Promise<void>;
  disconnect: () => void;
  disconnectAsync: () => Promise<void>;
};
```
