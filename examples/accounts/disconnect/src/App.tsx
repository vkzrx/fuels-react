import { useDisconnect } from 'fuels-react';

function App() {
  const { status, disconnect, isConnected } = useDisconnect({
    onSuccess: () => {
      alert('Successfully disconnected');
    },
  });

  if (!isConnected) return <div>Already disconnected</div>;
  return (
    <>
      <div>Status: {status}</div>
      <button onClick={disconnect}>Disconnect</button>
    </>
  );
}

export default App;
