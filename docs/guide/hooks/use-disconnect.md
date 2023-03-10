# useDisconnect

Hook for disconnecting the user wallet from your app.

## Usage

```tsx
import { useDisconnect } from 'fuels-react';

function App() {
  const { status, error, disconnect, isConnected } = useDisconnect();
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

```ts
type UseDisconnectResult = {
  disconnect: () => void;
  disconnectAsync: () => Promise<void>;
  status: 'connected' | 'connecting' | 'disconnected' | 'disconnecting' | 'loading';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```

## Example

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/github/0xYami/fuels-react/tree/main/examples/accounts/disconnect?embed=1&file=src/App.tsx&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>
