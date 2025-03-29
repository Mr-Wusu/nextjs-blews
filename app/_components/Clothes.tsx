import { GiClothes } from "react-icons/gi";
import Cloth from "./Cloth";
import clothes from "@/data/clothings";
import Link from "next/link";

// interface ClothType {
//   _id: string;
//   description: string;
//   price: number;
//   image: string;
//   alt: string;
// }

export default async function Clothes() {
  // const response = await fetch("http://localhost:3000/api/clothes");
  // if (!response.ok) {
  //   const errorText = response.text();
  //   console.error("Error fetching clothes:", errorText);
  //   return;
  // }
  // const clothesData: ClothType[] = await response.json();
  // console.log(clothesData);

  return (
    <section className="flex flex-col gap-6 bg-lightRose1 px-6 pt-11 pb-9 ">
      <div className="flex gap-[1rem] md:gap-3 lg:gap-5 items-center mx-auto">
        <GiClothes className="text-[1.6rem] text-rose-950" />
        <h3 className="capitalize text-[1.125rem] md:text-xl lg:text-2xl font-semibold lg:font-bold text-rose-800 font-nunito lg:pb-5">
          A glance at some of our clothes
        </h3>
      </div>
      <div className="flex flex-col gap-12 md:grid md:grid-cols-2 md:gap-x-0 px-8 md:w-[45rem] md:mx-auto lg:grid-cols-3 lg:w-full">
        {clothes.map((cloth) => (
          <Cloth key={cloth._id} cloth={cloth} />
        ))}
      </div>
      <Link
        className=" w-max font-semibold text-darkRose2 mt-2 border-b-2 border-solid border-transparent hover:border-darkRose1 p-1 transition-all  duration-300 active:scale-90 focus:border-darkRose1 focus:border-2 md:text-base lg:text-lg"
        href="/clothes"
      >
        Browse our collection &rarr;
      </Link>
    </section>
  );
}
