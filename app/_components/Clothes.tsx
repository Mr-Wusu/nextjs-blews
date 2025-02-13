import { GiClothes } from "react-icons/gi";
import Cloth from "./Cloth";
import Link from "next/link";

interface ClothType {
  _id: string;
  description: string;
  price: number;
  image: string;
  alt: string;
}

export default async function Clothes() {
  try {
    const response = await fetch("http://localhost:3000/api/clothes");
    if (!response.ok) {
      const errorText = response.text();
      console.error("Error fetching clothes:", errorText);
      return;
    }
    const clothesData: ClothType[] = await response.json();
    console.log(clothesData);

    return (
      <section className="flex flex-col gap-6 bg-lightRose1 px-6 pt-4 pb-12 ">
        <div className="flex gap-[1rem] items-center justify-center ">
          <GiClothes className="text-[24px] text-rose-800" />
          <h2 className="capitalize text-[1.125em] font-semibold text-rose-800">
            A glance at some of our clothes
          </h2>
        </div>
        <div className="flex flex-col gap-12">
          {clothesData.map((cloth) => (
            <Cloth key={cloth._id} cloth={cloth} />
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
  } catch (error) {
    console.error("Error fetching clothes:", error);
  }
}