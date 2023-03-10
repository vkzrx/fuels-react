import { useSignMessage } from 'fuels-react';

function App() {
  const { data, signMessage, isLoading, isError } = useSignMessage({
    message: 'Hello World!',
  });
  if (isLoading) return <div>Signing message...</div>;
  if (isError) return <div>Signing message has failed</div>;
  return (
    <>
      <div>Signature: {data}</div>
      <button onClick={signMessage}>Sign</button>
    </>
  );
}

export default App;
