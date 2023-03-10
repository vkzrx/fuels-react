import { useTransaction } from 'fuels-react';

function App() {
  const transaction = useTransaction({
    transactionId: '0x3123ef57e04cfb69cd5bcede64ccbfe8f960befd1d6c230acc7cf84a34fe0652',
  });
  if (transaction.isLoading) return <div>Fetching transaction...</div>;
  if (transaction.data) return <div>Transaction not found</div>;
  return (
    <div>
      Transaction:{' '}
      <pre>
        <code>{JSON.stringify(transaction.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export default App;
