# useContract

Hook for creating a `Contract` instance.

If you don't have it already you'll need to generate the types from your ABIs.

With `pnpm`

```bash
$ pnpm dlx fuels typegen -i path/to/your/abis/*-abi.json -o output/dir
```

With `npm`

```bash
$ npx fuels typegen -i path/to/your/abis/*-abi.json -o output/dir
```

:::info NOTE
Switching chain will connect the contract instance to the new chain
:::

## Usage

```tsx
import { useState, useEffect } from 'react';
import { useContract } from 'fuels-react';
import type { CounterAbi } from './contracts/Counter';
import counterAbi from './contracts/counterAbi.json';

function App() {
  const [counter, setCounter] = useState<number | null>(null);
  const contract = useContract<CounterAbi>({
    address: '0x90efcc9a055fe39c840ccf785e63f7b062363e5a14c51854d616e17c20b40d74',
    abi: counterAbi,
  });

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const counter = await contract.functions.counter().get();
      setCounter(counter.value.toNumber());
    })();
  }, [contract]);

  const increment = async () => {
    if (!contract) return;
    await contract.functions.increment().call();
  };

  const decrement = async () => {
    if (!contract) return;
    await contract.functions.decrement().call();
  };

  return (
    <>
      <div>Counter: {counter}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
}
```

## Configuration

```ts
type UseContractConfig = {
  contractId: string | AbstractAddress;
  abi: JsonAbi | Interface;
  signerOrProvider?: BaseWalletLocked | Provider;
};
```

### address

`type: string | AbstractAddress`

Contract address your `Contract` instance will be connected to.

```tsx {5}
import { useContract } from 'fuels-react';

function App() {
  const contract = useContract({
    address: '0x90efcc9a055fe39c840ccf785e63f7b062363e5a14c51854d616e17c20b40d74',
  });
}
```

### abi

`type: JsonAbi | Interface`

Contract abi your `Contract` instance will use to craft payloads.

```tsx {2,3,6,8}
import { useContract } from 'fuels-react';
import type { CounterAbi } from './contracts/Counter';
import counterAbi from './contracts/counterAbi.json';

function App() {
  const contract = useContract<CounterAbi>({
    address: '0x90efcc9a055fe39c840ccf785e63f7b062363e5a14c51854d616e17c20b40d74',
    abi: counterAbi,
  });
}
```

### signerOrProvider (optional)

`type: BaseWalletLocked | Provider`

Custom signer or provider you want to use if needed. Defaults to the provider injected by the user wallet, if not injected then it fallbacks to the provider used when creating the client.

```tsx {1,7,11}
import { Provider } from 'fuels';
import { useContract } from 'fuels-react';
import type { CounterAbi } from './contracts/Counter';
import counterAbi from './contracts/counterAbi.json';

function App() {
  const provider = new Provider('https://node-beta-2.fuel.network/graphql');
  const contract = useContract<CounterAbi>({
    address: '0x90efcc9a055fe39c840ccf785e63f7b062363e5a14c51854d616e17c20b40d74',
    abi: counterAbi,
    signerOrProvider: provider,
  });
}
```

## Return Type

```ts
type UseContractResult<T extends Contract> = T | null;
```

## Example

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/github/0xYami/fuels-react/blob/main/examples/contracts/contract?embed=1&file=src/App.tsx&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>
