# useMessages

Hook for fetching all messages of an address.

:::info NOTE
It automatically refetches the messages whenever the address changes or the user switches chain
:::

## Usage

```tsx
import { useMessages } from 'fuels-react';

function App() {
  const messages = useMessages({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });

  if (messages.isLoading) return <div>Fetching messages...</div>;
  if (messages.isError) return <div>Fetching messages has failed</div>;
  return (
    <>
      <div>Status: {messages.status}</div>
      <div>Total messages: {messages.length}</div>
    </>
  );
}
```

## Configuration

```ts
type UseMessagesConfig = {
  address: string | null;
  pagination?: {
    last?: number | null;
    first?: number | null;
    before?: string | null;
    after?: string | null;
  };
  refetchInterval?: number | false;
  onSuccess?: ((data: Message[]) => void) | undefined;
  onError?: ((error: unknown) => void) | undefined;
};
```

### address

`type: string | null`

Address to fetch the messages for. Passing `null` will not run the query.

```tsx {5}
import { useMessages } from 'fuels-react';

function App() {
  const messages = useMessages({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });
}
```

### pagination (optional)

`type: CursorPaginationArgs`

Parameter for paginating the result.

```tsx {6-8}
import { useMessages } from 'fuels-react';

function App() {
  const messages = useMessages({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    pagination: {
      first: 10,
    },
  });
}
```

### refetchInterval (optional)

`type: number | false`

Interval in `milliseconds` to automatically refetch the messages.

```tsx {6}
import { useMessages } from 'fuels-react';

function App() {
  const messages = useMessages({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    refetchInterval: 1000,
  });
}
```

### onSuccess (optional)

`type: ((data: Message[]) => void) | undefined`

Callback to trigger a `side-effect` once fetching messages is successful.

```tsx {6-8}
import { useMessages } from 'fuels-react';

function App() {
  const messages = useMessages({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    onSuccess: (data) => {
      alert(`Fetched ${data.length} messages`);
    },
  });
}
```

### onError (optional)

`type: ((error: unknown) => void) | undefined`

Callback to trigger a `side-effect` if fetching messages has failed.

```tsx {6-8}
import { useMessages } from 'fuels-react';

function App() {
  const messages = useMessages({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
    onError: (error) => {
      alert('Failed to fetch messages');
    },
  });
}
```

## Return Type

```ts
type Message = {
  sender: AbstractAddress;
  recipient: AbstractAddress;
  nonce: BN;
  amount: BN;
  data: BytesLike;
  daHeight: BN;
};

type UseMessagesResult = {
  data: Message[] | undefined;
  status: 'loading' | 'success' | 'error';
  error: unknown;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
```
