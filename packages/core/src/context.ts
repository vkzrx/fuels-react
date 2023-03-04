import { createContext, createElement, useContext } from 'react';
import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { Client } from './client';

type ContextConfig = {
  client: Client;
};

const Context = createContext<{ client: Client | null }>({
  client: null,
});

function FuelProvider({ children, client }: PropsWithChildren<ContextConfig>) {
  return createElement(Context.Provider, {
    children: createElement(QueryClientProvider, {
      children,
      client: client.queryClient,
    }),
    value: { client },
  });
}

function useClient(): Client {
  const { client } = useContext(Context);
  if (!client) {
    throw new Error('Fuel client not initialized');
  }
  return client;
}

export { useClient, FuelProvider };
