import Cart from "./Cart"

const cart = [
  { image: "/images/clothings/cloth-2.jpg", name: "Bubariga", amount: 2, price: 12000, prevPrice: 76000 },
  { image: "/images/clothings/cloth-2.jpg", name: "Bubariga1", amount: 2, price: 12000, prevPrice: 76000 },
  { image: "/images/clothings/cloth-2.jpg", name: "Bubariga2", amount: 2, price: 12000, prevPrice: 76000 },
  { image: "/images/clothings/cloth-2.jpg", name: "Bubariga3", amount: 2, price: 12000, prevPrice: 76000 },
];



export default function CartList() {
  return (
    <section className="flex flex-col gap-[1.2px] bg-rose-300 h-fit rounded-[.75rem] overflow-hidden shadow-sm shadow-black w-[90%] max-w-[26rem] lg:max-w-[32rem]">
      <header className="text-xl px-5 py-4 font-semibold bg-rose-100">
        Cart ({cart.length})
      </header>
      
        {cart.map(cartItem => <Cart item={cartItem} key={cartItem.name}/> )}
      
    </section>
  );
}
