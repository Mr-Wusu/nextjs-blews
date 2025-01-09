import { GiClothes } from "react-icons/gi";

import clothes from "@/data/clothings";
import Cloth from "./Cloth";
import Link from "next/link";

export default function Clothes() {
  return (
    <section className="flex flex-col gap-6 bg-lightRose1 px-6 pt-4 pb-12 ">
      <div className="flex gap-[1rem] items-center justify-center ">
        <GiClothes className="text-[24px] text-rose-800" />
        <h2 className="capitalize text-[1.125em] font-semibold text-rose-800">
          A glance at some of our clothes
        </h2>
      </div>
      <div className="flex flex-col gap-12">
        {clothes.map((cloth, i) => (
          <Cloth key={i} cloth={cloth} />
        ))}
      </div>
      <Link
        className=" w-max font-semibold text-darkRose2 mt-2 border-b-2 border-solid border-transparent hover:border-darkRose1 p-1 transition-all  duration-300 active:scale-90 focus:border-darkRose1 focus:border-2"
        href="/clothes"
      >
        Browse our collection &rarr;
      </Link>
    </section>
  );
}
