import Image from "next/image";

export default function Hero() {
  return (
    <div className="h-[450px] w-full relative">
      <div className="absolute w-full h-full bg-gradient-to-r from-darkRose1 to-darkRose1 z-10 top-0 opacity-[.50] left-0" />

      <Image
        fill
        className="object-cover absolute"
        priority
        src="/images/appPhotos/photo-2.jpg"
        alt="Hero image"
      />

      <div className="flex gap-3 absolute top-[60%] left-0 pl-5 z-20">
        <div>
          <h1 className="h1-custom-font text-3xl font-extrabold w-[90%] capitalize text-transparent bg-clip-text bg-gradient-to-r from-lightRose1 to-rose200">
            With Blews&apos; Stitches your wears fit inch-perfect!
          </h1>
        </div>
      </div>
    </div>
  );
}
