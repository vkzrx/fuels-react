# useBalance

Hook for fetching an address balance for a given asset.

## Usage

```tsx
import { useBalance } from 'fuels-react';

function App() {
  const balance = useBalance({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });

  if (balance.isLoading) return <div>Fetching balance...</div>;
  if (balance.isError) return <div>Fetching balance has failed</div>;
  return <div>Balance: {balance.data}</div>;
}
```

## Configuration

```ts
type UseBalanceConfig = {
  address: string | null;
  assetId?: string;
  onSuccess?: ((data: string) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### address

`type: string | null`

Address to fetch the balance for. Passing `null` will not run the query.

```tsx {5}
import { useBalance } from 'fuels-react';

function App() {
  const balance = useBalance({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });
}
```

### assetId (optional)

`type: string`

Asset id of the balance to fetch. Defaults to native Fuel asset if `undefined`

```tsx {6}
import { useBalance } from 'fuels-react';

function App() {
  const balance = useBalance({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  });
}
```

### onSuccess (optional)

`type: ((data: string) => void) | undefined`

Callback to trigger a `side-effect` once fetching the balance is successful.

```tsx {6-8}
import { useBalance } from 'fuels-react';

function App() {
  const balance = useBalance({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    onSuccess: (data) => {
      alert(`Fetched balance ${data}`);
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if fetching the balance has failed.

```tsx {6-8}
import { useBalance } from 'fuels-react';

function App() {
  const balance = useBalance({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    onError: (error) => {
      alert('Failed to fetch balance');
    },
  });
}
```

## Return Type

```ts
type UseBalanceResult = {
  data: string | undefined;
  status: 'loading' | 'success' | 'error';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```
