"use client";

import Image from "next/image";
import Link from "next/link";
import { useOrganization } from "@clerk/nextjs";
import { MdDelete } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import * as motion from "motion/react-client";

interface Clothing {
  _id: number;
  image: string;
  alt: string;
  description: string;
  price: number;
}

interface ClothProps {
  cloth: Clothing;
}

export default function Cloth({ cloth }: ClothProps) {
  const { membership } = useOrganization();
  const isAdmin = membership?.role === "org:admin";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      className="relative radius flex flex-col w-[15.3125rem] md:w-[17rem] mx-auto h-[26rem] overflow-hidden border border-darkRose2 shadow-sm shadow-black"
    >
      {isAdmin && (
        <RiFileEditFill
          className="absolute z-10 text-rose-700 text-2xl top-[10px] left-2 hover:text-rose-600 transition-text duration-300 ease-in-out cursor-pointer"
          onClick={() => console.log("Deleted!")}
        />
      )}
      {isAdmin && (
        <MdDelete
          className="absolute z-10 text-rose-700 text-3xl top-2 right-2 hover:text-rose-600 transition-text duration-300 ease-in-out cursor-pointer"
          onClick={() => console.log("Deleted!")}
        />
      )}
      <div className="relative h-[52%] ">
        <Image
          src={cloth.image}
          alt={cloth.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <figcaption className="flex flex-col py-3 px-4 gap-2 text-[0.9375rem] md:text-[1.025rem]">
        <h3 className="">Description</h3>
        <p className="">{cloth.description}</p>
        <div className="flex justify-between items-center pr-2">
          <div className="flex flex-col ">
            <p className="text-[15px]">Price:</p>
            <p className="text-[14px]">NGN{cloth.price}</p>
          </div>
          <Link
            className="bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 text-lightRose1 py-1 px-2 tracking-wide rounded self-center transition-bg duration-300 ease-in-out"
            href={`/clothes/${cloth._id}`}
          >
            Sew me
          </Link>
        </div>
      </figcaption>
    </motion.figure>
  );
}
