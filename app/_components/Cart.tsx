"use client";
import Image from "next/image";
import { Button } from "./Button";
import { useState } from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

interface Cart {
  image: string;
  name: string;
  amount: number;
  price: number;
  prevPrice: number;
}
interface CartProps {
  item: Cart
}

function percentageDiscount(price: number, prevPrice: number) {
  const difference = price - prevPrice;
  const decimal = difference / prevPrice;
  const percentage = decimal * 100;
  return percentage.toFixed(0);
}

function Cart({item}: CartProps) {
  const [count, setCount] = useState(1);

  function countIncreaseHandler() {
    setCount((prev) => prev + 1);
  }
  function countDecreaseHandler() {
    if (count >= 2) {
      setCount((prev) => prev - 1);
    } else return;
  }
  return (
    <div className="flex justify-between px-3 bg-rose-100 py-4">
      <div className="flex gap-2 items-center">
        <div className="relative h-16 w-14 rounded-[.3rem] overflow-hidden">
          <Image src={item.image} alt={`${item.name}'s photo`} fill />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm">{item.name}</h3>
          <div className="flex cursor-pointer gap-2">
            <FiTrash2 className="text-rose-500" />
            <p className="text-sm text-rose-500">Remove</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="font-semibold flex justify-end">NGN {item.price * count}</div>
          <div className="flex gap-2 text-sm">
            <div className="text-rose-500 line-through">
              NGN {item.prevPrice}
            </div>
            <div>{`${percentageDiscount(item.price, item.prevPrice)}%`}</div>
          </div>
        </div>
        <div className="flex gap-[0.675rem] items-center w-fit self-end">
          <Button
            className="w-[2rem] h-[2rem] grid place-content-center"
            onClick={countDecreaseHandler}
          >
            <FiMinus />
          </Button>
          <p>{count}</p>
          <Button
            className="w-[2rem] h-[2rem] grid place-content-center"
            onClick={countIncreaseHandler}
          >
            <FiPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
