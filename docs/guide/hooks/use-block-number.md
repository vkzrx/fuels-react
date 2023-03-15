# useBlockNumber

Hook for fetching the current block number.

:::info NOTE
Switching chain will make this hook refetch the current block number of the new chain
:::

## Usage

```tsx
import { useBlockNumber } from 'fuels-react';

function App() {
  const blockNumber = useBlockNumber();

  if (blockNumber.isLoading) return <div>Fetching block number...</div>;
  if (blockNumber.isError) return <div>Fetching block number has failed</div>;
  return (
    <>
      <div>Status: {blockNumber.status}</div>
      <div>Block number: {blockNumber.data}</div>
    </>
  );
}
```

## Configuration

```ts
type UseBlockNumberConfig = {
  refetchInterval?: number | false;
  onSuccess?: ((data: string) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### refetchInterval (optional)

`type: number | false`

Interval in `milliseconds` to automatically refetch the current block number.

```tsx {5}
import { useBlockNumber } from 'fuels-react';

function App() {
  const blockNumber = useBlockNumber({
    idOrHeight: 900000,
  });
}
```

### onSuccess (optional)

`type: ((data: Block) => void) | undefined`

Callback to trigger a `side-effect` once fetching the current block number is successful.

```tsx {6-8}
import { useBlockNumber } from 'fuels-react';

function App() {
  const blockNumber = useBlockNumber({
    onSuccess: (data) => {
      alert(`Fetched blockNumber ${data}`);
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if fetching the current block number has failed.

```tsx {6-8}
import { useBlockNumber } from 'fuels-react';

function App() {
  const blockNumber = useBlockNumber({
    onError: (error) => {
      alert('Failed to fetch current block number');
    },
  });
}
```

## Return Type

```ts
type UseBlockNumberResult = {
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

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/github/0xYami/fuels-react/tree/main/examples/networks/block-number?embed=1&file=src/App.tsx&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>
