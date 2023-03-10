import { useBlockWithTransactions } from 'fuels-react';

function App() {
  const block = useBlockWithTransactions({
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
      {block.data?.transactions.map((transaction, index) => (
        <div key={index} style={{ marginTop: '10px' }}>
          <div>Transaction type: {transaction.type}</div>
          <div>Gas limit: {transaction.gasLimit?.toString()}</div>
          <div>Gas price: {transaction.gasPrice?.toString()}</div>
        </div>
      ))}
    </>
  );
}

export default App;
