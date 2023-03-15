import { useMemo, useState } from 'react';
import { useBlock, useBlockNumber } from 'fuels-react';
import * as Switch from '@radix-ui/react-switch';
import Card from '../components/Card';
import type { CardProps } from '../components/Card';
import { clsx } from 'clsx';

function BlockSection() {
  const [autoRefetch, setAutoRefetch] = useState(false);
  const blockNumber = useBlockNumber({
    refetchInterval: autoRefetch ? 1000 : undefined,
  });
  const block = useBlock({ idOrHeight: blockNumber.data || null });

  const blockData = useMemo<CardProps['data']>(() => {
    return [
      { label: 'Fetching', value: blockNumber.isFetching ? 'True' : 'False' },
      { label: 'Number', value: block.data?.height.toString() || '' },
      { label: 'Hash', value: block.data?.id || '' },
      { label: 'Transactions', value: block.data?.transactionIds.length || '' },
    ];
  }, [blockNumber.isFetching, block.data]);

  return (
    <div>
      <div className="flex flex-col space-y-2 mb-10">
        <h2 className="text-2xl">Block</h2>
        <p>
          Get a block with or without its transactions by using its number or id, below is the
          latest block of the beta-2 chain.
        </p>
        <p>
          Toggle the auto-refresh to refetch automatically the latest block every seconds, the
          interval is configurable.
        </p>
      </div>
      <Card
        title="Block"
        description="Retrieve block information"
        data={blockData}
        Action={
          <div className="flex items-center">
            <label
              className="text-white text-[15px] leading-none pr-[15px]"
              htmlFor="airplane-mode"
            >
              Auto refetch
            </label>
            <Switch.Root
              id="airplane-mode"
              checked={autoRefetch}
              onClick={() => setAutoRefetch((prev) => !prev)}
              className="w-[35px] h-[18px] rounded-full relative bg-neutral-400 data-[state=checked]:bg-blue-500 outline-none cursor-default"
            >
              <Switch.Thumb
                className={clsx([
                  'block w-[15px] h-[15px] bg-white rounded-full',
                  'transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]',
                ])}
              />
            </Switch.Root>
          </div>
        }
      />
    </div>
  );
}

export default BlockSection;
