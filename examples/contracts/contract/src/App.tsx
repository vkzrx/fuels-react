import { useState, useEffect } from 'react';
import { useContract } from 'fuels-react';
import type { CounterAbi } from './counter';
import counterAbi from './counter/abi.json';

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

export default App;
