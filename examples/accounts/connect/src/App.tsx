import { useConnect } from 'fuels-react';

function App() {
  const { status, connect, isConnected } = useConnect({
    onSuccess: () => {
      alert('Successfully connected');
    },
  });

  if (isConnected) return <div>Already connected</div>;
  return (
    <>
      <div>Status: {status}</div>
      <button onClick={connect}>Connect</button>
    </>
  );
}

export default App;
