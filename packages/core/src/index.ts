import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import useBalance from './hooks/useBalance';
import useBlock from './hooks/useBlock';
import useBlockWithTransactions from './hooks/useBlockWithTransactions';
import useCoins from './hooks/useCoins';
import useConnect from './hooks/useConnect';
import useContract from './hooks/useContract';
import useDisconnect from './hooks/useDisconnect';
import useLatestBlockNumber from './hooks/useLatestBlockNumber';
import useChains from './hooks/useChains';
import useProvider from './hooks/useProvider';
import useSignMessage from './hooks/useSignMessage';
import useTransfer from './hooks/useTransfer';
import useTransaction from './hooks/useTransaction';
import useTransactionCost from './hooks/useTransactionCost';
import useWallet from './hooks/useWallet';

export { FuelProvider, createClient, useClient } from './context';
export type { UserStatus } from './stores';

// TODO: Find how to better handle react-query context
// https://github.com/TanStack/query/issues/3595
// Exposing react-query to allow composing queries at the app-level
export { useQuery, useQueryClient, useMutation };

export {
  useBalance,
  useBlock,
  useBlockWithTransactions,
  useCoins,
  useConnect,
  useContract,
  useDisconnect,
  useLatestBlockNumber,
  useChains,
  useProvider,
  useSignMessage,
  useTransfer,
  useTransaction,
  useTransactionCost,
  useWallet,
};
