"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import * as motion from "motion/react-client";

interface Clothing {
  id: number,
  image: string;
  alt: string;
  description: string;
  price: number;
}

interface ClothProps {
  cloth: Clothing;
}

export default function Cloth({ cloth }: ClothProps) {
  const {data}= useSession();
  const isAdmin = data?.user?.email === "wusu_prince@yahoo.com";
  

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
    className="relative radius flex flex-col w-[245px] mx-auto h-[24rem] overflow-hidden border border-darkRose2 shadow-sm shadow-black">
      {isAdmin && (
        <RiFileEditFill className="absolute z-10  text-2xl text-rose-300 top-3 left-2 cursor-pointer hover:text-rose-600 transition-all" />
      )}
      {isAdmin && (
        <MdDelete className="absolute z-10 text-3xl text-rose-300 top-2 right-3 cursor-pointer hover:text-rose-600 transition-all" />
      )}

      <div className="relative h-[52%] bg-slate-400">
        <Image
          src={cloth.image}
          alt={cloth.alt}
          fill
          className="object-cover"
        />
      </div>
      <figcaption className="flex flex-col py-3 px-4 gap-2 text-[15px]">
        <h3 className="">Description</h3>
        <p className="">{cloth.description}</p>
        <div className="flex justify-between items-center pr-2">
          <div className="flex flex-col ">
            <p className="text-[15px]">Price:</p>
            <p className="text-[14px]">NGN{cloth.price}</p>
          </div>
          <Link
            className="transition-all bg-rose-400 px-2 py-1 rounded text-sm shadow-sm hover:bg-rose-500"
            href={`/clothes/${cloth.id}`}
          >
            Sew me
          </Link>
        </div>
      </figcaption>
    </motion.figure>
  );
}
