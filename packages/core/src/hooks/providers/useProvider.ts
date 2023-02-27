import type { Provider } from 'fuels';
import { useSnapshot } from 'valtio';
import { ProviderNotDefined } from '../../errors';
import { providerStore } from '../../stores';
import type { Chain } from '../../stores';

type UseProviderResult = {
  provider: Provider;
  chains: Chain[] | null;
};

function useProvider(): UseProviderResult {
  const { chains, defaultProvider } = useSnapshot(providerStore);
  if (!defaultProvider) throw ProviderNotDefined;
  return {
    provider: defaultProvider,
    chains,
  };
}

export default useProvider;
