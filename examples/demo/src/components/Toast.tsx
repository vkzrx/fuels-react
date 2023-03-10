import * as RadixToast from '@radix-ui/react-toast';

type ToastProps = {
  message: string;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const Toast = (props: ToastProps) => {
  return (
    <RadixToast.Provider swipeDirection="right">
      <RadixToast.Root
        className="bg-neutral-800 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] py-3 grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={props.open}
        onOpenChange={props.onOpenChange}
      >
        <RadixToast.Title className="[grid-area:_title] mb-[5px] font-medium text-[15px]">
          {props.message}
        </RadixToast.Title>
      </RadixToast.Root>
      <RadixToast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[280px] max-w-[100vw] text-center m-0 list-none z-[2147483647] outline-none" />
    </RadixToast.Provider>
  );
};

export default Toast;
