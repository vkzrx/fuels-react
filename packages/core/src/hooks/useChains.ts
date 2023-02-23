import { useSnapshot } from 'valtio';
import { providerStore } from '../stores';
import type { Chain } from '../stores';

type UseChainResult = {
  currentChain: Chain | null;
  chains: Chain[] | null;
};

function useChains(): UseChainResult {
  const { currentChain, chains } = useSnapshot(providerStore);
  return { currentChain, chains };
}

export default useChains;
