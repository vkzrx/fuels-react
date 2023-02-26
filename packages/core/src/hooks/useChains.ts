import { useSnapshot } from 'valtio';
import { providerStore } from '../stores';
import type { Chain } from '../stores';

type UseChainsResult = {
  currentChain: Chain | null;
  chains: Chain[] | null;
};

function useChains(): UseChainsResult {
  const { currentChain, chains } = useSnapshot(providerStore);
  return { currentChain, chains };
}

export default useChains;
