import { useSnapshot } from 'valtio';
import { useClient } from '../../context';
import { store } from '../../stores';
import type { Chain } from '../../stores';

type UseChainsResult = {
  currentChain: Chain | null;
  chains: Chain[] | null;
};

function useChains(): UseChainsResult {
  const client = useClient();
  const { currentChain } = useSnapshot(store);
  return { currentChain, chains: client.chains };
}

export default useChains;
