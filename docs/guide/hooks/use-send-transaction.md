# useSendTransaction

Hook for sending a transaction.

## Usage

```tsx
import { useSendTransaction } from 'fuels-react';

function App() {
  const { data, sendTransaction, isLoading, isError } = useSendTransaction({
    request: { type: 'create', gasLimit: '10000', gasPrice: '1' },
  });
  if (isLoading) return <div>Sending transaction...</div>;
  if (isError) return <div>Sending transaction has failed</div>;
  return (
    <>
      <div>Transaction: {data}</div>
      <button onClick={sendTransaction}>Send Transaction</button>
    </>
  );
}
```

## Configuration

```ts
type TransactionRequest = {
  type: 'script' | 'create' | 'mint';
  gasLimit?: string;
  gasPrice?: string;
  inputs?: TransactionRequestInput[],
  outputs?: TransactionRequestOutput[],
  maturity?: number,
  witnesses?: (string | Bytes)[],
};

type UseSendTransactionConfig = {
  request: TransactionRequest;
  onSuccess?: ((data: TransactionResponse) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### request

`type: TransactionRequest`

Transaction payload to send.

```tsx {5-9}
import { useSendTransaction } from 'fuels-react';

function App() {
  const { data, sendTransaction, isLoading } = useSendTransaction({
    request: {
      type: 'create',
      gasLimit: '10000',
      gasPrice: '1',
    },
  });
}
```

### onSuccess (optional)

`type: ((data: TransactionResponse) => void) | undefined`

Callback to trigger a `side-effect` once sending the transaction is successful.

```tsx {10-12}
import { useSendTransaction } from 'fuels-react';

function App() {
  const { data, sendTransaction, isLoading } = useSendTransaction({
    request: {
      type: 'create',
      gasLimit: '10000',
      gasPrice: '1',
    },
    onSuccess: (data) => {
      alert('Transaction sent successfully');
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if sending the transaction has failed.

```tsx {10-12}
import { useSendTransaction } from 'fuels-react';

function App() {
  const { data, sendTransaction, isLoading } = useSendTransaction({
    request: {
      type: 'create',
      gasLimit: '10000',
      gasPrice: '1',
    },
    onError: (error) => {
      alert('Failed to send transaction');
    },
  });
}
```

## Return Type

```ts
type UseSendTransactionResult = {
  data: TransactionResponse | undefined;
  status: 'loading' | 'success' | 'error';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```
