import { useBlock } from 'fuels-react';

function App() {
  const block = useBlock({
    idOrHeight: 900000,
  });

  if (block.isLoading) return <div>Fetching block...</div>;
  if (block.isError) return <div>Fetching block has failed</div>;
  return (
    <>
      <div>Status: {block.status}</div>
      <div>Block height: {block.data?.height}</div>
      <div>Block time: {block.data?.time}</div>
      <div>Block ID: {block.data?.id}</div>
      <div>Total transactions: {block.data?.transactionIds.length}</div>
    </>
  );
}

export default App;
