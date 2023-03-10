import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import useBalance from './hooks/accounts/useBalance';
import useBalances from './hooks/accounts/useBalances';
import useBlock from './hooks/networks/useBlock';
import useBlockWithTransactions from './hooks/networks/useBlockWithTransactions';
import useCoins from './hooks/accounts/useCoins';
import useConnect from './hooks/accounts/useConnect';
import useContract from './hooks/contracts/useContract';
import useDisconnect from './hooks/accounts/useDisconnect';
import useLatestBlockNumber from './hooks/networks/useLatestBlockNumber';
import useChains from './hooks/networks/useChains';
import useMessages from './hooks/accounts/useMessages';
import useProvider from './hooks/providers/useProvider';
import useSendTransaction from './hooks/transactions/useSendTransaction';
import useSignMessage from './hooks/accounts/useSignMessage';
import useTransfer from './hooks/accounts/useTransfer';
import useTransaction from './hooks/transactions/useTransaction';
import useTransactionCost from './hooks/transactions/useTransactionCost';
import useWallet from './hooks/accounts/useWallet';

export { createClient } from './client';
export { FuelProvider, useClient } from './context';
export type { UserStatus } from './stores';

// TODO: Find how to better handle react-query context
// https://github.com/TanStack/query/issues/3595
// Exposing react-query to allow composing queries at the app-level
export { useQuery, useQueryClient, useMutation };

export {
  useBalance,
  useBalances,
  useBlock,
  useBlockWithTransactions,
  useCoins,
  useConnect,
  useContract,
  useDisconnect,
  useLatestBlockNumber,
  useChains,
  useMessages,
  useProvider,
  useSendTransaction,
  useSignMessage,
  useTransfer,
  useTransaction,
  useTransactionCost,
  useWallet,
};
