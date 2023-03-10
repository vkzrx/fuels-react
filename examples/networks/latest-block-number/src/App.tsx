import { useLatestBlockNumber } from 'fuels-react';

function App() {
  const blockNumber = useLatestBlockNumber();
  if (blockNumber.isLoading) return <div>Fetching block number...</div>;
  if (blockNumber.isError) return <div>Fetching block number has failed</div>;
  return (
    <>
      <div>Status: {blockNumber.status}</div>
      <div>Block number: {blockNumber.data}</div>
    </>
  );
}

export default App;
