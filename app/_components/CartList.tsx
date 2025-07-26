"use client";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";



export default function CartList() {
  const cart = useSelector((state: RootState) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.unit, 0);
 
  
  if (cartCount === 0)
    return (
      <h2 className="text-center text-rose-500 font-semibold p-4">
        Your cart is empty
      </h2>
    );
  return (
    <main className="flex flex-col gap-[1.2px] bg-rose-300 h-fit rounded-[.75rem] overflow-hidden shadow-sm shadow-black w-[90%] max-w-[26rem] lg:max-w-[32rem]">
      <header className="text-xl px-5 py-4 font-semibold bg-rose-100">
        Cart ({cartCount})
      </header>

      {cart.map((cartItem) => (
        <Cart item={cartItem} key={cartItem._id} />
      ))}
    </main>
  );
}
