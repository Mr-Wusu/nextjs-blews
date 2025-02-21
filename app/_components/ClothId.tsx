"use client";
import { useRouter } from "next/navigation";
import clothes from "@/data/clothings";
import { Button } from "@/app/_components/Button";
import Image from "next/image";

export default function ClothId({ slug }: { slug: string }) {
  const router = useRouter();
  const cloth = clothes.find((cloth) => cloth._id.toString() === slug);

  function handleClick() {
    router.back();
  }

  if (!cloth) {
    return <div>Cloth not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col gap-3 pt-12">
      <div className="relative w-full h-[300px]">
        <Image
          fill
          className="object-cover"
          src={cloth.image}
          alt={cloth.alt}
        />
      </div>
      <div className="flex flex-col mb-3 px-3">
        <h1>Cloth Id: {cloth._id}</h1>
        <p className="font-semibold">Name: {cloth.alt}</p>
        <p>
          Description:{" "}
          {`${cloth.description} ipsum dolor sit amet, consectetur adipiscing elit. Ut ac porttitor metus, et consequat eros.`}
        </p>
      </div>
      <div className="flex gap-7 w-4/5 ml-auto items-center ">
        <button className="border-2 h-fit leading-none border-rose-500 rounded-[.3rem] px-3 py-[6px] mb-[-10px] flex hover:bg-gradient-to-l hover:from-rose-400 hover:to-rose-100 transition-all duration-300 ease-linear tracking-wide" onClick={handleClick}>
         &larr; Back
        </button>
        <Button className="tracking-wider" onClick={handleClick}>Checkout</Button>
      </div>
    </div>
  );
}
