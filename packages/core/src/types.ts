import type {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import type { TransactionRequestLike } from 'fuels';

export type BaseUseQueryConfig<TData> = Pick<UseQueryOptions<TData>, 'onSuccess' | 'onError'>;

export type BaseUseQueryResult<TData> = Pick<
  UseQueryResult<TData>,
  'data' | 'status' | 'error' | 'isError' | 'isFetching' | 'isLoading' | 'isSuccess'
>;

export type BaseUseMutationConfig<TData = void, TVariables = void> = Pick<
  UseMutationOptions<TData, unknown, TVariables>,
  'onError' | 'onSuccess'
>;

export type BaseUseMutationResult<TData = void, TVariables = void> = Pick<
  UseMutationResult<TData, unknown, TVariables>,
  'data' | 'error' | 'status' | 'isError' | 'isLoading' | 'isSuccess'
>;

export type TransactionType = 'script' | 'create' | 'mint';

// Make Fuel `TransactionType` more human readable
// https://fuellabs.github.io/fuels-ts/packages/fuel-ts-transactions/enums/TransactionType.html
export const transactionTypeToNativeEnum: Record<TransactionType, number> = {
  script: 0,
  create: 1,
  mint: 2,
};

export type TransactionRequest = Omit<TransactionRequestLike, 'type' | 'gasLimit' | 'gasPrice'> & {
  type: TransactionType;
  gasLimit: string;
  gasPrice: string;
};

export type NonEmptyArray<T> = [T, ...T[]];
