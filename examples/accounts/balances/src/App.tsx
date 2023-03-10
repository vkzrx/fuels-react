import { useBalances } from 'fuels-react';

function App() {
  const balances = useBalances({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });

  if (balances.isLoading) return <div>Fetching balances...</div>;
  if (balances.isError) return <div>Fetching balances has failed</div>;
  return (
    <>
      <div>Assets</div>
      {balances.data?.map(balance => (
        <div key={balance.assetId} style={{ paddingTop: '10px' }}>
          <div>Asset id: {balance.assetId}</div>
          <div>Amount: {balance.amount}</div>
          {balance.max ? (
            <div>Max: {balance.max}</div>
          ) : null}
        </div>
      ))}
    </>
  );
}

export default App;

