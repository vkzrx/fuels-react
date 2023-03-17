import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createClient, FuelProvider } from 'fuels-react';
import App from './App';

const client = createClient({ chains: ['beta-2'] });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FuelProvider client={client}>
      <App />
    </FuelProvider>
  </React.StrictMode>,
);
