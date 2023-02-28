# useBlock

Hook for fetching a given block.

## Usage

```tsx
import { useBlock } from 'fuels-react';

function App() {
  const block = useBlock({
    idOrHeight: 900000,
  });

  if (block.isLoading) return <div>Fetching block...</div>;
  if (block.isError) return <div>Fetching block has failed</div>;
  return (
    <>
      <div>Status: {block.status}</div>
      <div>Block height: {block.data.height}</div>
      <div>Block time: {block.data.time}</div>
      <div>Block ID: {block.data.id}</div>
      <div>Total transactions: {block.data.transactionIds.length}</div>
    </>
  );
}
```

## Configuration

```ts
type UseBlockConfig = {
  idOrHeight: number | string | null;
  onSuccess?: ((data: Block) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### idOrHeight

`type: number | string | null`

Block ID or number to fetch. Passing `null` will not run the query.

```tsx {5}
import { useBlock } from 'fuels-react';

function App() {
  const block = useBlock({
    idOrHeight: 900000,
  });
}
```

### onSuccess (optional)

`type: ((data: Block) => void) | undefined`

Callback to trigger a `side-effect` once fetching a block is successful.

```tsx {6-8}
import { useBlock } from 'fuels-react';

function App() {
  const block = useBlock({
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
import { useBlock } from 'fuels-react';

function App() {
  const block = useBlock({
    idOrHeight: 900000,
    onError: (error) => {
      alert('Failed to fetch block');
    },
  });
}
```

## Return Type

```ts
type Block = {
  id: string;
  height: string;
  time: string;
  transactionIds: string[];
};

type UseBlockResult = {
  data: Block | undefined;
  status: 'loading' | 'success' | 'error';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```
