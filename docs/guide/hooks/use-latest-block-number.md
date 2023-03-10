# useLatestBlockNumber

Hook for fetching the latest block number.

:::info NOTE
Switching chain will make this hook refetch the latest block number of the new chain
:::

## Usage

```tsx
import { useLatestBlockNumber } from 'fuels-react';

function App() {
  const blockNumber = useLatestBlockNumber();

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
type UseLatestBlockNumberConfig = {
  refetchInterval?: number | false;
  onSuccess?: ((data: string) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### refetchInterval (optional)

`type: number | false`

Interval in `milliseconds` to automatically refetch the latest block number.

```tsx {5}
import { useLatestBlockNumber } from 'fuels-react';

function App() {
  const blockNumber = useLatestBlockNumber({
    idOrHeight: 900000,
  });
}
```

### onSuccess (optional)

`type: ((data: Block) => void) | undefined`

Callback to trigger a `side-effect` once fetching the latest blocknumber is successful.

```tsx {6-8}
import { useLatestBlockNumber } from 'fuels-react';

function App() {
  const blockNumber = useLatestBlockNumber({
    onSuccess: (data) => {
      alert(`Fetched blockNumber ${data}`);
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if fetching the latest block number has failed.

```tsx {6-8}
import { useLatestBlockNumber } from 'fuels-react';

function App() {
  const blockNumber = useLatestBlockNumber({
    onError: (error) => {
      alert('Failed to fetch latest block number');
    },
  });
}
```

## Return Type

```ts
type UseLatestBlockNumberResult = {
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

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/github/0xYami/fuels-react/tree/main/examples/networks/latest-block-number?embed=1&file=src/App.tsx&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>
