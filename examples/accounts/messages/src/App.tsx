import { useMessages } from 'fuels-react';

function App() {
  const messages = useMessages({
    address: 'fuel1wc9hhur34dywx3cvkynhaegw8yyyfcd646fp9qaln720w9jw6xzsjz755w',
  });

  if (messages.isLoading) return <div>Fetching messages...</div>;
  if (messages.isError) return <div>Fetching messages has failed</div>;
  return (
    <>
      <div>Status: {messages.status}</div>
      <div>Total messages: {messages.data?.length}</div>
    </>
  );
}

export default App;
