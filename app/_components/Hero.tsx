import { auth } from "@/auth";
import Image from "next/image";
const heroImage = "/images/appPhotos/photo-8.jpg";

export default async function Hero() {
  const session = await auth();
  console.log(session);

  return (
    <div className="h-[450px] w-full relative">
      <div className="absolute w-full h-full bg-gradient-to-r from-darkRose1 to-darkRose1 z-10 top-0 opacity-[.50] left-0" />
      <div className="absolute w-full h-full z-5 top-0 left-0">
        <Image fill src={heroImage} alt="The Hero image" />
      </div>
      <div className="flex gap-3 absolute top-[67%] left-0 pl-5 z-20">
        <h1 className="h1-custom-font text-3xl font-extrabold w-[90%] capitalize text-transparent bg-clip-text bg-gradient-to-r from-lightRose1 to-rose200">
          With Blews&apos; Stitches <br />
          your wears fit inch-perfect!
        </h1>
      </div>
    </div>
  );
}
