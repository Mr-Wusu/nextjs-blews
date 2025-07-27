"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/Button";
import Image from "next/image";
import { useClothes } from "@/contexts/ClothesContext";
import { useAuth } from "@clerk/nextjs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { decreaseUnit, increaseUnit, removeItem } from "@/state/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function ClothId({
  slug,
  className,
  bg,
  clothContainer,
}: {
  slug: string;
  className: string;
  bg: string;
  clothContainer: string;
}) {
  const [isCounter, setIsCounter] = useState(false);
  const { clothes } = useClothes();
  const user = useAuth();
  const isAdmin = user.orgRole === "org:admin" ? true : false;
  const router = useRouter();
  const dispatch = useDispatch();

  // const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const item = cart.find((item) => item._id === slug);
  const cloth = clothes?.find((cloth) => cloth._id.toString() === slug);

  function handleIncrease() {
    dispatch(
      increaseUnit({
        _id: cloth?._id,
        alt: cloth?.alt,
        imageUrl: cloth?.imageUrl,
        description: cloth?.description,
        price: cloth?.price,
      })
    );
  }

  function handlDecrease() {
    if (item !== undefined && item.unit > 1) {
      dispatch(decreaseUnit({ _id: item._id }));
    }
    if (item !== undefined && item.unit === 1) {
      dispatch(removeItem({ _id: item._id }));
      setIsCounter(false);
    }
  }

  function handleClick() {
    router.back();
  }

  if (!cloth) {
    return <div>Cloth not found! Might have been deleted from database</div>;
  }

  return (
    <div
      className={`flex bg-rose-100 w-full max-w-[28rem] flex-col lg+:flex-row lg+:w-fit lg+:max-w-none lg+:mx-auto md:shadow-md md:shadow-black pb-5 overflow-hidden mt-14 lg+:mt-[5.5rem] md:pb-6 lg+:pb-0 lg+:mb-5 ${bg}`}
    >
      <div
        className={`relative w-full h-[21rem] lg+:w-[26rem] md:h-[28rem] lg+:h-[34rem] overflow-hidden ${clothContainer}`}
      >
        {cloth.imageUrl && cloth.imageUrl.trim() !== "" ? (
          <Image
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={cloth.imageUrl}
            alt={cloth.alt}
          />
        ) : (
          <Image
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/placeholder-image.jpg"
            alt="No image available"
          />
        )}
      </div>
      <div
        className={`flex flex-col gap-3 px-5 md:px-10 pt-2 md:pt-5 md:text-lg md:w-5/6 mx-auto lg+:w-[25rem] lg+:items-center lg+:justify-center ${className}`}
      >
        <h1>Cloth Id: {cloth._id}</h1>
        <div className="flex flex-col mt-2 md:text-[1.1rem]">
          <p className="font-semibold leading-5 mb-2">Name: {cloth.alt}</p>
          <p className="text-justify">
            Description:{" "}
            {`${cloth.description} ipsum dolor sit amet, consectetur adipiscing elit. Ut ac porttitor metus, et consequat eros.`}
          </p>
        </div>
        <div className="hidden gap-7 w-4/5 mx-auto items-center py-4 lg+:flex">
          <button
            className="border-2 h-fit leading-none border-rose-500 rounded-[.3rem] px-3 py-[6px] flex hover:bg-gradient-to-l hover:from-rose-400 hover:to-rose-100 transition-all duration-300 ease-linear tracking-wide"
            onClick={handleClick}
          >
            &larr; Back
          </button>
          {isAdmin === false &&
            (!isCounter ? (
              <Button
                className="tracking-wider px-2 w-fit"
                onClick={() => setIsCounter(true)}
              >
                Add to Cart
              </Button>
            ) : (
              <div className="flex gap-3 items-center">
                <Button className="w-fit px-2 py-2" onClick={handlDecrease}>
                  <FaMinus />
                </Button>

                <p className="text-darkRose2">
                  {item === undefined ? 0 : item.unit}
                </p>
                <Button className="w-fit px-2 py-2" onClick={handleIncrease}>
                  <FaPlus />
                </Button>
              </div>
            ))}
        </div>
      </div>
      <div className="flex gap-7 w-4/5 ml-auto md:ml-[6.5rem] md+:ml-[7.4rem] items-center py-4 lg+:hidden">
        <button
          className="border-2 h-fit leading-none border-rose-500 rounded-[.3rem] px-3 py-[6px] flex hover:bg-gradient-to-l hover:from-rose-400 hover:to-rose-100 transition-all duration-300 ease-linear tracking-wide"
          onClick={handleClick}
        >
          &larr; Back
        </button>
        {isAdmin === false &&
          (!isCounter ? (
            <Button
              className="tracking-wider px-2 w-fit"
              onClick={() => setIsCounter(true)}
            >
              Add to Cart
            </Button>
          ) : (
            <div className="flex gap-3 items-center">
              <Button className="w-fit px-2 py-2" onClick={handlDecrease}>
                <FaMinus />
              </Button>

              <p className="text-darkRose2">
                {item === undefined ? 0 : item.unit}
              </p>
              <Button className="w-fit px-2 py-2" onClick={handleIncrease}>
                <FaPlus />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
