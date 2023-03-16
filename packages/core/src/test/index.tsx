import React from 'react';
import { renderHook as renderHook_ } from '@testing-library/react';
import { createClient, FuelProvider } from '..';

const client = createClient({
  chains: ['localhost'],
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  },
});

function wrapper({ children }: React.PropsWithChildren) {
  return <FuelProvider client={client}>{children}</FuelProvider>;
}

export function renderHook<TProps, TResult>(hook: (props?: TProps) => TResult) {
  return renderHook_<TResult, TProps>(hook, { wrapper });
}
