# useSignMessage

Hook for signing a given message.

## Usage

```tsx
import { useSignMessage } from 'fuels-react';

function App() {
  const { data, signMessage, isLoading, isError } = useSignMessage({
    message: 'Hello World!',
  });
  if (isLoading) return <div>Signing message...</div>;
  if (isError) return <div>Signing message has failed</div>;
  return (
    <>
      <div>Signature: {data}</div>
      <button onClick={signMessage}>Sign</button>
    </>
  );
}
```

## Configuration

```ts
type UseSignMessageConfig = {
  message: string | null;
  onSuccess?: ((data: string, variables: string) => void) | undefined;
  onError?: ((error: unknown, variables: string) => void) | undefined;
};
```

### message

`type: string | null`

Message to sign

```tsx {5}
import { useSignMessage } from 'fuels-react';

function App() {
  const { data, signMessage } = useSignMessage({
    message: 'Hello World!',
  });
}
```

### onSuccess (optional)

`type: ((data: string, variables: string) => void) | undefined`

Callback to trigger a `side-effect` once signing the message is successful.

```tsx {6-8}
import { useSignMessage } from 'fuels-react';

function App() {
  const { data, signMessage } = useSignMessage({
    message: 'Hello World!',
    onSuccess: (data) => {
      alert(`Signed message ${data}`);
    },
  });
}
```

### onError (optional)

`type: ((error: unknown, variables: string) => void) | undefined`

Callback to trigger a `side-effect` if signing the message has failed.

```tsx {6-8}
import { useSignMessage } from 'fuels-react';

function App() {
  const { data, signMessage } = useSignMessage({
    message: 'Hello World!',
    onError: (error) => {
      alert('Failed to sign message');
    },
  });
}
```

## Return Type

```ts
type UseSignMessageResult = {
  data: string | undefined;
  status: 'loading' | 'success' | 'error';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```

## Example

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/github/0xYami/fuels-react/tree/main/examples/accounts/sign-message?embed=1&file=src/App.tsx&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>
