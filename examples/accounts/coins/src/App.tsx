import { useCoins } from 'fuels-react';

function App() {
  const coins = useCoins({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });

  if (coins.isLoading) return <div>Fetching coins...</div>;
  if (coins.isError) return <div>Fetching coins has failed</div>;
  return (
    <>
      <div>Status: {coins.status}</div>
      <div>Found: {coins.data?.length}</div>
    </>
  );
}

export default App;
