import { describe, expect, it } from 'vitest';
// import { waitFor } from '@testing-library/react'
import { renderHook } from '../../test';
import useBlockNumber from './useBlockNumber';

describe('useBlockNumber', () => {
  it('mounts', async () => {
    renderHook(() => useBlockNumber());

    // await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { data } = result.current;
    // console.log('data', data)
    expect(true).toBeTruthy();
  });
});
