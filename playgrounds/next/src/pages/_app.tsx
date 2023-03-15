import '~/styles/globals.css';
import type { AppProps } from 'next/app';
import { createClient, FuelProvider } from 'fuels-react';

const client = createClient({ chains: ['beta-2'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FuelProvider client={client}>
      <Component {...pageProps} />
    </FuelProvider>
  );
}
