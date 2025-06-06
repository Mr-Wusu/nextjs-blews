import Image from "next/image";
import { GiClothes } from "react-icons/gi";
import { MdSchool } from "react-icons/md";
export default function OurServices() {
  return (
    <section className="pt-10 pb-12 px-4 text-center">
      <div className="sm:hidden flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl leading-10 font-semibold">
            See Our <span className="text-rose-700">Core</span> Services
          </h1>
          <p className="text-lg leading-8">
            At the heart of our business is a passion for fashion and
            creativity. We specialize in delivering high-quality, personalized
            fashion solutions that cater to your unique style and needs. Explore
            our core services below
          </p>
        </div>
        <div className="flex flex-col gap-7 ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <GiClothes className="text-2xl text-darkRose1" />
              <h2 className="text-xl font-semibold text-darkRose1 text-center">
                Custom Clothing Design
              </h2>
            </div>
            <p className="text-lg leading-8">
              We create unique, tailor-made clothing that reflects your personal
              style and fits you perfectly. From concept to creation, we ensure
              every piece is crafted with care and precision.
            </p>
            <div className="w-full h-[15.5rem] rounded-[.6rem] relative overflow-hidden shadow-md shadow-black">
              <Image
                src="/images/appPhotos/photo-8.jpg"
                alt="photo showing a fashion designer making sketches"
                className="object-cover "
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <MdSchool className="text-2xl text-darkRose1" />
              <h2 className="text-xl font-semibold text-darkRose1 text-center">
                Training Fashion Designers
              </h2>
            </div>
            <p className="text-lg leading-8">
              We empower aspiring fashion designers with hands-on training and
              expert guidance. From sketching to sewing, our program hones your
              creative skills and technical precision, shaping you into a
              confident, industry-ready designer.
            </p>
            <div className="w-full h-[15.5rem] rounded-[.6rem] relative overflow-hidden shadow-md shadow-black">
              <Image
                src="/images/appPhotos/photo-6.jpg"
                alt="photo showing a fashion designer making sketches"
                className="object-cover "
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex"></div>
    </section>
  );
}
