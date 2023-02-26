# useTransaction

Hook for fetching a transaction.

## Usage

```tsx
import { useTransaction } from 'fuels-react';

function App() {
  const transaction = useTransaction({
    transactionId: '0x3123ef57e04cfb69cd5bcede64ccbfe8f960befd1d6c230acc7cf84a34fe0652',
  });
  if (transaction.isLoading) return <div>Fetching transaction...</div>;
  if (transaction.isError) return <div>Fetching transaction has failed</div>;
  return (
    <>
      <div>Transaction ID: {transaction.data.id}</div>
      <div>Transaction type: {transaction.data.type}</div>
    </>
  );
}
```

## Configuration

```ts
type UseTransactionConfig = {
  transactionId: string | null;
  onSuccess?: ((data: Transaction) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### transactionId

`type: string | null`

`ID` of the transaction to fetch. Passing `null` will not run the query.

```tsx {5}
import { useTransaction } from 'fuels-react';

function App() {
  const transaction = useTransaction({
    transactionId: '0x3123ef57e04cfb69cd5bcede64ccbfe8f960befd1d6c230acc7cf84a34fe0652',
  });
}
```

### onSuccess (optional)

`type: ((data: Transaction) => void) | undefined`

Callback to trigger a `side-effect` once fetching the transaction is successful.

```tsx {6-8}
import { useTransaction } from 'fuels-react';

function App() {
  const transaction = useTransaction({
    transactionId: '0x3123ef57e04cfb69cd5bcede64ccbfe8f960befd1d6c230acc7cf84a34fe0652',
    onSuccess: (data) => {
      alert(`Fetched transaction ${data.id}`);
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if fetching the transaction has failed.

```tsx {6-8}
import { useTransaction } from 'fuels-react';

function App() {
  const transaction = useTransaction({
    transactionId: '0x3123ef57e04cfb69cd5bcede64ccbfe8f960befd1d6c230acc7cf84a34fe0652',
    onError: (error) => {
      alert('Failed to fetch transaction');
    },
  });
}
```

## Return Type

```ts
type UseTransactionResult = {
  data: Transaction | undefined;
  status: 'loading' | 'success' | 'error';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```
