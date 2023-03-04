import type { Provider } from 'fuels';
import { useClient } from '../../context';
import type { Chain } from '../../stores';

type UseProviderResult = {
  provider: Provider;
  chains: Chain[] | null;
};

function useProvider(): UseProviderResult {
  const client = useClient();
  return {
    provider: client.getDefaultProvider(),
    chains: client.chains,
  };
}

export default useProvider;
