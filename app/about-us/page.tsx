import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center lg:px-10 ">
      <div className="relative lg:max-w-[40rem] bg-yellow-100 h-fit">
        <Image src="/images/appPhotos/photo-10.jpg" alt="photo describing the about us" className=""
        fill/>
      </div>
      <div>Currently under development!</div>
    </div>
  );
}
