# useTransactionCost

Hook for fetching the cost of a transaction. It enables to set the gas limit and gas price before sending a transaction.

## Usage

```tsx
import { useTransactionCost } from 'fuels-react';

function App() {
  const transactionCost = useTransactionCost({
    transactionRequest: '',
  });
  if (transactionCost.isLoading) return <div>Fetching transaction cost...</div>;
  if (transactionCost.isError) return <div>Fetching transaction cost has failed</div>;
  return (
    <>
      <div>Fee: {transactionCost.data.fee}</div>
      <div>Gas used: {transactionCost.data.gasUsed}</div>
      <div>Gas price: {transactionCost.data.gasPrice}</div>
      <div>Min gas price {transactionCost.data.minGasPrice}</div>
    </>
  );
}
```

## Configuration

```ts
type UseTransactionCostConfig = {
  transactionRequest: TransactionRequestLike | null;
  tolerance?: number;
  onSuccess?: ((data: TransactionCost) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### transactionRequest

`type: TransactionRequestLike | null`

Transaction request to estimate the cost of. Passing `null` will not run the query.

```tsx {5}
import { useTransactionCost } from 'fuels-react';

function App() {
  const transactionCost = useTransactionCost({
    transactionRequest: '',
  });
}
```

### tolerance (optional)

`type: number`

Margin cost of the transaction cost estimation. Defaults to `0.2` (20%).

```tsx {5}
import { useTransactionCost } from 'fuels-react';

function App() {
  const transactionCost = useTransactionCost({
    transactionRequest: '',
    tolerance: 0.5,
  });
}
```

### onSuccess (optional)

`type: ((data: TransactionCost) => void) | undefined`

Callback to trigger a `side-effect` once fetching the transaction cost is successful.

```tsx {6-8}
import { useTransactionCost } from 'fuels-react';

function App() {
  const transactionCost = useTransactionCost({
    transactionRequest: '',
    onSuccess: (data) => {
      alert(`Fetched transaction cost ${data.fee}`);
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if fetching the transaction cost has failed.

```tsx {6-8}
import { useTransactionCost } from 'fuels-react';

function App() {
  const transactionCost = useTransactionCost({
    transactionRequest: '',
    onError: (error) => {
      alert('Failed to fetch transaction cost');
    },
  });
}
```

## Return Type

```ts
type UseTransactionCostResult = {
  data: TransactionCost | undefined;
  status: 'loading' | 'success' | 'error';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```
