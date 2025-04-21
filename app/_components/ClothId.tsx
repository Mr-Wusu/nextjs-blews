"use client";
import { useRouter } from "next/navigation";
import clothes from "@/data/clothings";
import { Button } from "@/app/_components/Button";
import Image from "next/image";

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
  const router = useRouter();
  const cloth = clothes.find((cloth) => cloth._id.toString() === slug);

  function handleClick() {
    router.back();
  }

  if (!cloth) {
    return <div>Cloth not found</div>;
  }

  return (
    <div
      className={`flex bg-rose-100 w-[22.55rem] flex-col gap-4 pb-5 overflow-hidden border-[2px] mt-14 md:pb-6 md:w-[27rem] border-rose-600 rounded-[0.7rem] ${bg}`}
    >
      <div
        className={`relative w-full h-[21rem]   md:h-[23rem] overflow-hidden ${clothContainer}`}
      >
        <Image
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={cloth.image}
          alt={cloth.alt}
        />
      </div>
      <div className={`flex flex-col mb- px-5 md:px-5 ${className}`}>
        <h1>Cloth Id: {cloth._id}</h1>
        <div className="flex flex-col mt-2 md:text-[1.1rem]">
          <p className="font-semibold leading-5 mb-2">Name: {cloth.alt}</p>
          <p className="text-justify">
            Description:{" "}
            {`${cloth.description} ipsum dolor sit amet, consectetur adipiscing elit. Ut ac porttitor metus, et consequat eros.`}
          </p>
        </div>
      </div>
      <div className="flex gap-7 w-4/5 ml-auto items-center ">
        <button
          className="border-2 h-fit leading-none border-rose-500 rounded-[.3rem] px-3 py-[6px] flex hover:bg-gradient-to-l hover:from-rose-400 hover:to-rose-100 transition-all duration-300 ease-linear tracking-wide"
          onClick={handleClick}
        >
          &larr; Back
        </button>
        <Button className="tracking-wider px-2 w-fit" onClick={handleClick}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
