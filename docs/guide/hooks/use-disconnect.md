# useDisconnect

Hook for disconnecting the user wallet from your app.

## Usage

```tsx
import { useDisconnect } from 'fuels-react';

function App() {
  const { status, error, connect, isConnected } = useDisconnect();
  if (!isConnected) return <div>Already disconnected</div>;
  return (
    <>
      <div>Status: {status}</div>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}
```

## Configuration

```ts
type UseDisconnectConfig = {
  onSuccess?: (() => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### onSuccess (optional)

`type: (() => void) | undefined`

Callback to trigger a `side-effect` once the user wallet is disconnected from your app.

```tsx {5-7}
import { useDisconnect } from 'fuels-react';

function App() {
  const { status, disconnect } = useDisconnect({
    onSuccess: () => {
      alert('Disconnected successfully');
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if disconnecting the user wallet from your app has failed.

```tsx {5-7}
import { useDisconnect } from 'fuels-react';

function App() {
  const { status, error, disconnect } = useDisconnect({
    onError: (error) => {
      alert('Failed to disconnect');
    },
  });
}
```

## Return Type

:::warning
Wallet events are not supported yet so `locked` status is not supported.
:::

```ts
type UseDisconnectResult = {
  disconnect: () => void;
  disconnectAsync: () => Promise<void>;
  status: 'connected' | 'connecting' | 'disconnected' | 'disconnecting' | 'locked';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```
