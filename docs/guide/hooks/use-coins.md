# useCoins

Hook for fetching the list of coins for an address.

:::info NOTE
It automatically refetches the coins whenever the address changes or the user switches chain
:::

## Usage

```tsx
import { useCoins } from 'fuels-react';

function App() {
  const coins = useCoins({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });

  if (coins.isLoading) return <div>Fetching coins...</div>;
  if (coins.isError) return <div>Fetching coins has failed</div>;
  return (
    <>
      <div>Status: {coins.status}</div>
      <div>Found: {coins.data?.length}</div>
    </>
  );
}
```

## Configuration

```ts
type UseCoinsConfig = {
  address: string | null;
  assetId?: string;
  pagination?: {
    last?: number | null;
    first?: number | null;
    before?: string | null;
    after?: string | null;
  };
  onSuccess?: ((data: Coin[]) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### address

`type: string | null`

Address to fetch the list of coins for. Passing `null` will not run the query.

```tsx {5}
import { useCoins } from 'fuels-react';

function App() {
  const coins = useCoins({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });
}
```

### assetId (optional)

`type: string`

The asset ID of coins fetch. Defaults to all asset IDs if `undefined`

```tsx {6}
import { useCoins } from 'fuels-react';

function App() {
  const coins = useCoins({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  });
}
```

### pagination (optional)

`type: CursorPaginationArgs`

Parameter for paginating the result.

```tsx {6-8}
import { useCoins } from 'fuels-react';

function App() {
  const coins = useCoins({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    pagination: {
      first: 10,
    },
  });
}
```

### onSuccess (optional)

`type: ((data: Coin[]) => void) | undefined`

Callback to trigger a `side-effect` once fetching the list of coins is successful.

```tsx {6-8}
import { useCoins } from 'fuels-react';

function App() {
  const coins = useCoins({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    onSuccess: (data) => {
      alert(`Fetched list of coins ${data.length}`);
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if fetching the list of coins has failed.

```tsx {6-8}
import { useCoins } from 'fuels-react';

function App() {
  const coins = useCoins({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    onError: (error) => {
      alert('Failed to fetch list of coins');
    },
  });
}
```

## Return Type

```ts
type Coin = {
  id: string;
  assetId: string;
  amount: BN;
  owner: AbstractAddress;
  status: GqlCoinStatus;
  maturity: number;
  blockCreated: BN;
};

type UseBlockResult = {
  data: Coin[] | undefined;
  status: 'loading' | 'success' | 'error';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```
