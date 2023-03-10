# useBlockWithTransactions

Hook for fetching a given block with its transactions.

:::info NOTE
It automatically refetches the block whenever `idOrHeight` changes or the user switches chain
:::

## Usage

```tsx
import { useBlockWithTransactions } from 'fuels-react';

function App() {
  const block = useBlockWithTransactions({
    idOrHeight: 900000,
  });

  if (block.isLoading) return <div>Fetching block...</div>;
  if (block.isError) return <div>Fetching block has failed</div>;
  return (
    <>
      <div>Status: {block.status}</div>
      <div>Block height: {block.data?.height}</div>
      <div>Block time: {block.data?.time}</div>
      <div>Block ID: {block.data?.id}</div>
      <div>Total transactions: {block.data?.transactionIds.length}</div>
      {block.data?.transactions.map((transaction, index) => (
        <div key={index}>
          <div>Transaction type: {transaction.type}</div>
          <div>Gas limit: {transaction.gasLimit?.toString()}</div>
          <div>Gas price: {transaction.gasPrice?.toString()}</div>
        </div>
      ))}
    </>
  );
}
```

## Configuration

```ts
type UseBlockWithTransactionsConfig = {
  idOrHeight: number | string | null;
  onSuccess?: ((data: string) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### idOrHeight

`type: number | string | null`

Block ID or number to fetch. Passing `null` will not run the query.

```tsx {5}
import { useBlockWithTransactions } from 'fuels-react';

function App() {
  const block = useBlockWithTransactions({
    idOrHeight: 900000,
  });
}
```

### onSuccess (optional)

`type: ((data: BlockWithTransactions) => void) | undefined`

Callback to trigger a `side-effect` once fetching a block is successful.

```tsx {6-8}
import { useBlockWithTransactions } from 'fuels-react';

function App() {
  const block = useBlockWithTransactions({
    idOrHeight: 900000,
    onSuccess: (data) => {
      alert(`Fetched block ${data.height}`);
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if fetching a block has failed.

```tsx {6-8}
import { useBlockWithTransactions } from 'fuels-react';

function App() {
  const block = useBlockWithTransactions({
    idOrHeight: 900000,
    onError: (error) => {
      alert('Failed to fetch block');
    },
  });
}
```

## Return Type

```ts
type BlockWithTransactions = Block & {
  transactions: Transaction[];
};

type UseBlockWithTransactionResult = {
  data: BlockWithTransactions | undefined;
  status: 'loading' | 'success' | 'error';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```

## Example

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/github/0xYami/fuels-react/tree/main/examples/networks/block-with-transactions?embed=1&file=src/App.tsx&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>
