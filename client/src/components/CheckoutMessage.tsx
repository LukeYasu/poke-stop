import { useUser } from './useUser';

type Props = {
  showMessage: boolean;
  closeMessage: () => void;
};

export function CheckoutMessage({ showMessage, closeMessage }: Props) {
  const { user } = useUser();

  return (
    <div className={showMessage ? 'hiden' : ''}>
      <div className="checkout-message-bg"></div>
      <div className="checkout-message">
        <div className="m-2">Thank you {user?.username} for your order!</div>
        <button
          onClick={closeMessage}
          className="h-10 w-10 border-2 border-slate-300 rounded m-2 bg-slate-200">
          X
        </button>
      </div>
    </div>
  );
}
