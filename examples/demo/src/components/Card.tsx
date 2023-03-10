import { clsx } from 'clsx';

export type CardProps = {
  title: string;
  description: string;
  data: {
    label: string;
    value: string | number;
  }[];
  Action?: JSX.Element;
};

function Card(props: CardProps) {
  return (
    <div
      className={clsx([
        'min-h-[100px] space-y-4 p-4',
        'border-neutral-600 border-[0.1px] rounded-lg',
      ])}
    >
      <div className="flex justify-between">
        <div>
          <div>{props.title}</div>
          <div className="text-neutral-500">{props.description}</div>
        </div>
        {props.Action}
      </div>
      {props.data.map((row) => (
        <div key={row.label} className="space-y-4">
          <div className="h-[1px] bg-neutral-600" />
          <div className="flex justify-between">
            <span>{row.label}</span>
            <span className="w-[300px] text-right truncate">{row.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
