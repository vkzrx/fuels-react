# useBalances

Hook for fetching all asset balances of an address.

:::info NOTE
It automatically refetches the balances whenever the address changes or the user switches chain
:::

## Usage

```tsx
import { useBalances } from 'fuels-react';

function App() {
  const balances = useBalances({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });

  if (balances.isLoading) return <div>Fetching balances...</div>;
  if (balances.isError) return <div>Fetching balances has failed</div>;
  return (
    <>
      {balances?.map((balance) => (
        <div key={balance.assetId}>
          <div>Asset ID: {balance.assetId}</div>
          <div>Amount: {balance.amount}</div>
          <div>Max: {balance.max}</div>
        </div>
      ))}
    </>
  );
}
```

## Configuration

```ts
type UseBalancesConfig = {
  address: string | null;
  pagination?: {
    last?: number | null;
    first?: number | null;
    before?: string | null;
    after?: string | null;
  };
  onSuccess?: ((data: string) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### address

`type: string | null`

Address to fetch the balances for. Passing `null` will not run the query.

```tsx {5}
import { useBalances } from 'fuels-react';

function App() {
  const balances = useBalances({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });
}
```

### pagination (optional)

`type: CursorPaginationArgs`

Parameter for paginating the result.

```tsx {6-8}
import { useBalances } from 'fuels-react';

function App() {
  const balance = useBalances({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    pagination: {
      first: 10,
    },
  });
}
```

### onSuccess (optional)

`type: ((data: string) => void) | undefined`

Callback to trigger a `side-effect` once fetching the balances is successful.

```tsx {6-8}
import { useBalances } from 'fuels-react';

function App() {
  const balance = useBalances({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    onSuccess: (data) => {
      alert(`Fetched balances ${data.length}`);
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if fetching the balances has failed.

```tsx {6-8}
import { useBalances } from 'fuels-react';

function App() {
  const balance = useBalances({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    onError: (error) => {
      alert('Failed to fetch balance');
    },
  });
}
```

## Return Type

```ts
type CoinQuantity = {
  assetId: string;
  amount: string;
  max?: string | undefined;
};

type UseBalancesResult = {
  data: CoinQuantity[] | undefined;
  status: 'loading' | 'success' | 'error';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```

## Example

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/github/0xYami/fuels-react/tree/main/examples/accounts/balances?embed=1&file=src/App.tsx&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>
