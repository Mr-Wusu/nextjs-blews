import { Button } from "./Button";

function CartSummary() {
  return (
    <aside className="flex flex-col gap-4 w-[90%] max-w-[26rem] lg:self-start">
      <div className="flex flex-col gap-[1.2px] bg-rose-300 h-fit rounded-[.75rem] overflow-hidden shadow-sm shadow-black">
        <header className="px-6 py-3 uppercase font-semibold tracking-wide bg-rose-100">
          Cart Summary
        </header>
        <div className="flex flex-col bg-rose-100 px-3 py-5 gap-5">
          <div className="flex px-3 justify-between font-semibold text-lg">
            <h3>Subtotal</h3>
            <p>NGN 12500</p>
          </div>
          <p className="px-3 text-rose-500">Delivery fee not included yet</p>
        </div>
        <div className="bg-rose-100 py-3 grid place-content-center">
          <Button className="w-[17rem] px-3 py-2">Checkout (NGN 12500)</Button>
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-rose-100 rounded-[.75rem] py-2 px-3 shadow-sm shadow-black">
        <h3 className="font-semibold text-lg">Returns are easy</h3>
        <p>Free return within 7 days for <span>ALL{" "}</span>eligible items</p>
      </div>
    </aside>
  );
}

export default CartSummary;
