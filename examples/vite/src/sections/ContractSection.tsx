import { useMemo, useState } from 'react';
import type { TransactionType } from 'fuels';
import { useTransaction } from 'fuels-react';
import useCounter from '../hooks/useCounter';
import Card from '../components/Card';
import type { CardProps } from '../components/Card';
import Toast from '../components/Toast';

const transactionTypeToString: Record<TransactionType, string> = {
  '0': 'script',
  '1': 'create',
  '2': 'mint',
};

function ContractSection() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const counter = useCounter();
  const transaction = useTransaction({
    transactionId: counter.increment.data?.transactionId || null,
  });

  const incrementDetails = useMemo<CardProps['data']>(() => {
    const { data, status } = counter.increment;
    return [
      { label: 'Status', value: status },
      { label: 'Transaction id', value: data?.transactionId || '' },
      { label: 'Gas used', value: data?.gasUsed.toString() || '' },
    ];
  }, [counter.increment.data, counter.increment.status]);

  const decrementDetails = useMemo<CardProps['data']>(() => {
    const { data, status } = counter.decrement;
    return [
      { label: 'Status', value: status },
      { label: 'Transaction id', value: data?.transactionId || '' },
      { label: 'Gas used', value: data?.gasUsed.toString() || '' },
    ];
  }, [counter.decrement.data, counter.decrement.status]);

  const transactionDetails = useMemo<CardProps['data']>(() => {
    const type = transaction.data ? transactionTypeToString[transaction.data.type] : '';
    return [
      { label: 'Type', value: type },
      { label: 'Transaction Id', value: counter.increment.data?.transactionId || '' },
      { label: 'Gas limit', value: transaction.data?.gasLimit?.toString() || '' },
      { label: 'Gas price', value: transaction.data?.gasPrice?.toString() || '' },
      { label: 'Maturity', value: transaction.data?.maturity?.toString() || '' },
      { label: 'Inputs', value: transaction.data?.inputsCount || '' },
      { label: 'Outputs', value: transaction.data?.outputsCount || '' },
      { label: 'Receipts root', value: transaction.data?.receiptsRoot || '' },
      { label: 'Script', value: transaction.data?.script || '' },
      { label: 'Script length', value: transaction.data?.scriptLength || '' },
      { label: 'Script data', value: transaction.data?.scriptData || '' },
      { label: 'Script data length', value: transaction.data?.scriptDataLength || '' },
      { label: 'Witnesses', value: transaction.data?.witnessesCount || '' },
    ];
  }, [transaction.data]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2 mb-2">
        <h2 className="text-2xl">Contract</h2>
        <p>Interact with a contract using its address and ABI.</p>
        <p>
          Callbacks are available to trigger side-effects, like being notified once the transaction
          went through or when an error occured.
        </p>
        <p>
          Here a simple Counter contract. A pop-up will appear at the bottom-right once an increment
          or decrement is done.
        </p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-between h-[150px] w-[120px] border-[0.1px] border-neutral-600 rounded-lg">
          <button
            type="button"
            onClick={() => {
              counter.increment.mutate(null, {
                onSuccess: () => {
                  setMessage('Increment successful!');
                  setOpen(true);
                },
                onError: (error) => {
                  let message = 'Unknown error occured :(';
                  if (typeof error === 'object' && error !== null && 'message' in error) {
                    message = error.message as string;
                  }
                  setMessage(message);
                  setOpen(true);
                },
              });
            }}
            className="grow"
          >
            <img src="/icons/plus.svg" alt="increment-icon" className="h-[25px] w-[25px] mx-auto" />
          </button>
          <span className="h-[40%] flex items-center justify-center border-y-[0.1px] border-neutral-600">
            {counter.data?.toString() || 'Fetching...'}
          </span>
          <button
            type="button"
            onClick={() => {
              counter.decrement.mutate(null, {
                onSuccess: () => {
                  setMessage('Decrement successful!');
                  setOpen(true);
                },
                onError: (error) => {
                  let message = 'Unknown error occured :(';
                  if (typeof error === 'object' && error !== null && 'message' in error) {
                    message = error.message as string;
                  }
                  setMessage(message);
                  setOpen(true);
                },
              });
            }}
            className="grow"
          >
            <img
              src="/icons/minus.svg"
              alt="decrement-icon"
              className="h-[25px] w-[25px] mx-auto"
            />
          </button>
        </div>
      </div>
      <div>Get the result of a transaction, here for the incrementation.</div>
      <Card
        title="Increment details"
        description="Increment the counter to see details"
        data={incrementDetails}
      />
      <div>And here for the decrementation.</div>
      <Card
        title="Decrement details"
        description="Decrement the counter to see details"
        data={decrementDetails}
      />
      <div className="space-y-8">
        <div className="flex flex-col space-y-2 mb-2">
          <h2 className="text-2xl">Transaction</h2>
          <p>
            Below is the transaction details of an increment call, increment the counter to see more
            the information here.
          </p>
        </div>
        <Card title="Transaction" description="Increment details" data={transactionDetails} />
      </div>
      <Toast message={message} open={open} onOpenChange={(isOpen: boolean) => setOpen(isOpen)} />
    </div>
  );
}

export default ContractSection;
