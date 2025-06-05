

import Image from "next/image";
import { ReactNode } from "react";

export default function Template ({children}: {children: ReactNode}) {
  return (
    <main className="relative h-screen w-full">
      <div className="block md:hidden absolute size-full">
        <Image
          src="/images/appPhotos/photo-9.jpg"
          alt="background image for signin page"
          fill
          className="object-cover size-full"
        />
      </div>
      <div className="hidden md:block absolute size-full">
        <Image
          src="/images/appPhotos/photo-7.jpg"
          alt="background image for signin page"
          fill
          className="object-cover size-full"
        />
      </div>
      <div className="absolute inset-0 bg-rose-800/30 z-30" />
      <div className="absolute z-40 top-1/2 left-1/2 -translate-x-1/2 translate-y-[-28.675rem] sm:-translate-y-[52%]">
        {children}
      </div>
    </main>
  );
}

