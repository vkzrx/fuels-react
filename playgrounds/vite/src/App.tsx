import reactLogo from './assets/react.svg';
import { useBlock, useWallet } from 'fuels-react';
import './App.css';

function App() {
  const wallet = useWallet();
  const block = useBlock({ idOrHeight: 900000 });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {wallet.isConnected ? (
          <button onClick={wallet.disconnect.mutate}>Disconnect</button>
        ) : (
          <button onClick={wallet.connect.mutate}>Connect</button>
        )}
        <p>
          Edit <code>src/App.tsx</code>
        </p>
      </div>
      {block.isLoading ? (
        <div>Fetching block...</div>
      ) : (
        <div style={{ textAlign: 'left' }}>
          <div>Block number: {block.data?.height.toString()}</div>
          <div>Total transactions: {block.data?.transactionIds.length}</div>
          <div>Block id: {block.data?.id}</div>
        </div>
      )}
      <p className="read-the-docs">
        Visit{' '}
        <a href="https://fuels-react.com" target="_blank" rel="noopener noreferrer">
          fuels-react
        </a>{' '}
        for more details
      </p>
    </div>
  );
}

export default App;
