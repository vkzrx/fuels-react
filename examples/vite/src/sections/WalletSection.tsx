import { useMemo } from 'react';
import { useBalance, useWallet } from 'fuels-react';
import type { UserStatus } from 'fuels-react';
import Card from '../components/Card';
import type { CardProps } from '../components/Card';

const userStatusToColor: Record<UserStatus, string> = {
  connected: 'bg-green-500',
  connecting: 'bg-blue-500',
  disconnected: 'bg-red-500',
  disconnecting: 'bg-yellow-500',
  locked: 'bg-purple-500',
};

function WalletSection() {
  const wallet = useWallet();
  const balance = useBalance({ address: wallet.address });

  const data = useMemo<CardProps['data']>(() => {
    return [
      { label: 'Address', value: wallet.address || '' },
      { label: 'Balance', value: balance.data || '' },
    ];
  }, [wallet.address, wallet.status, balance.data]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 mb-2">
        <h2 className="text-2xl">Wallet</h2>
        <p>
          Interact with official Fuel wallet. The chain is configurable at the app-level, the button
          below will connect you to the beta-2 chain.
        </p>
        <p>It also keeps track of the wallet state, feel free to refresh the page.</p>
        <p>Wallet events are not supported yet.</p>
      </div>
      <div className="flex justify-center">
        {wallet.isConnected ? (
          <button
            type="button"
            onClick={wallet.disconnect}
            className="p-2 border-[0.1px] border-neutral-600 rounded-lg"
          >
            Disconnect
          </button>
        ) : (
          <button
            type="button"
            onClick={wallet.connect}
            className="p-2 border-[0.1px] border-neutral-600 rounded-lg"
          >
            Connect
          </button>
        )}
      </div>
      <Card
        title="Wallet"
        description="Retrieve wallet information"
        data={data}
        Action={
          <div className="flex items-center space-x-2">
            <div>{wallet.status}</div>
            <div className={`h-2 w-2 rounded-full ${userStatusToColor[wallet.status]}`} />
          </div>
        }
      />
    </div>
  );
}

export default WalletSection;
