import { useChains } from 'fuels-react';

function App() {
  const { currentChain, chains } = useChains();
  return (
    <>
      <h2>Current chain</h2>
      <div>Name: {currentChain?.name}</div>
      <div>URL: {currentChain?.url}</div>
      <h2>Configured chains</h2>
      {chains?.map((chain) => (
        <div key={chain.name}>
          <div>Name: {chain.name}</div>
          <div>URL: {chain.url}</div>
        </div>
      ))}
    </>
  );
}

export default App;
