import { useProvider } from 'fuels-react';

function App() {
  const { provider, chains } = useProvider();
  return (
    <>
      <div>Current chain URL: {provider.url}</div>
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
