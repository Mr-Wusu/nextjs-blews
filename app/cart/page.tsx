// import Cart from "../_components/Cart";
import CartList from "../_components/CartList";
import CartSummary from "../_components/CartSummary";

export const metadata = {
  title: "Cart | Blews Stitches",
  description:
    "This page contains cart items and a general overview of them!",
};

export default function Clothes() {
  return (
    <div className="min-h-screen flex flex-col gap-7 items-center pt-[5rem] pb-11  lg:flex-row-reverse lg:justify-center ">
      <h1 className="text-rose-600">This feauture is currently under development!</h1>
      <CartSummary/>
      <CartList/>
    </div>
  );
}
