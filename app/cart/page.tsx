// import Cart from "../_components/Cart";
import BackToClothes from "../_components/BackToClothes";
import CartList from "../_components/CartList";
import CartSummary from "../_components/CartSummary";

export const metadata = {
  title: "Cart | Blews Stitches",
  description:
    "This page contains cart items and a general overview of them!",
};

export default function Clothes() {
  return (
    <div className="min-h-screen pt-[5rem] pb-11 flex flex-col gap-3 ">
      <h1 className="text-rose-600 self-center">
        This feature is currently under development!
      </h1>
      <div className="flex flex-col gap-7 items-center lg:flex-row-reverse lg:justify-center ">
        <CartSummary />
        <CartList />
      </div>
      <BackToClothes />
    </div>
  );
}
