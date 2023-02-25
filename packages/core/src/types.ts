import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export type BaseUseQueryConfig<T> = Pick<UseQueryOptions<T>, 'onSuccess' | 'onError'>;

export type BaseUseQueryResult<T> = Pick<
  UseQueryResult<T>,
  'data' | 'status' | 'error' | 'isError' | 'isFetching' | 'isLoading' | 'isSuccess'
>;

export type NonEmptyArray<T> = [T, ...T[]];
