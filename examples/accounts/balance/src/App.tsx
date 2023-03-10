import { useBalance } from 'fuels-react';

function App() {
  const balance = useBalance({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });

  if (balance.isLoading) return <div>Fetching balance...</div>;
  if (balance.isError) return <div>Fetching balance has failed</div>;
  return <div>Balance: {balance.data}</div>;
}

export default App;

