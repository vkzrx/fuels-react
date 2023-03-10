import { useWallet } from 'fuels-react';

function App() {
  const wallet = useWallet();
  return (
    <div>
      <div>Address: {wallet.address}</div>
      <div>Status: {wallet.status}</div>
      {wallet.isConnected ? (
        <button onClick={wallet.disconnect}>Disconnect</button>
      ) : (
        <button onClick={wallet.connect}>Connect</button>
      )}
    </div>
  );
}

export default App;
