# useConnect

Hook for connecting the user wallet to your app.

## Usage

```tsx
import { useConnect } from 'fuels-react';

function App() {
  const { status, error, connect, isConnected } = useConnect();
  if (isConnected) return <div>Already connected</div>;
  return (
    <>
      <div>Status: {status}</div>
      <button onClick={connect}>Connect</button>
    </>
  );
}
```

## Configuration

```ts
type UseConnectConfig = {
  onSuccess?: (() => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### onSuccess (optional)

`type: (() => void) | undefined`

Callback to trigger a `side-effect` once the user wallet is connected to your app.

```tsx {5-7}
import { useConnect } from 'fuels-react';

function App() {
  const { status, connect } = useConnect({
    onSuccess: () => {
      alert('Connected successfully');
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if connecting the user wallet to your app has failed.

```tsx {5-7}
import { useConnect } from 'fuels-react';

function App() {
  const { status, error, connect } = useConnect({
    onError: (error) => {
      alert('Failed to connect');
    },
  });
}
```

## Return Type

:::warning
Wallet events are not supported yet so `locked` status is not supported.
:::

```ts
type UseConnectResult = {
  connect: () => void;
  connectAsync: () => Promise<void>;
  status: 'connected' | 'connecting' | 'disconnected' | 'disconnecting' | 'locked';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```
