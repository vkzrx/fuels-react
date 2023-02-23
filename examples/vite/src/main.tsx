import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FuelProvider, createClient } from 'fuels-react';
import './index.css';

const client = createClient({
  chains: ['beta-2'],
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FuelProvider client={client}>
      <App />
    </FuelProvider>
  </React.StrictMode>,
);
