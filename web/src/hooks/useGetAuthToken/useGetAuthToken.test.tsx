import { renderHook } from 'tests';

import { useGetAuthToken } from './useGetAuthToken';

describe('useGetAuthToken', () => {
  it('returns a value', async () => {
    const { result } = renderHook(() => useGetAuthToken());

    expect(result.current).toEqual('1');
  });
});
