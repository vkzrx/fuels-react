import type {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

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

export type NonEmptyArray<T> = [T, ...T[]];
