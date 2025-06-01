import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center lg:px-10 pb-9">
      <div className="text-center flex flex-col gap-5 pt-14">
        {/* <h3 className="uppercase text-sm text-center">About Us</h3> */}
        <h1 className="text-4xl leading-[3rem]">
          Our vision is to create{" "}
          <span className="text-rose-700">bold designs</span> and{" "}
          <span className="text-rose-700">boundless expressions!</span> <br />{" "}
          With fashion that defines <span className="text-rose-700">you!!</span>
        </h1>
        <p className="text-lg w-2/4 mx-auto leading-7">
          We are a team of passionate individuals dedicated to bringing you the
          latest trends and timeless classics in fashion. Our mission is to
          empower you to express your unique style with confidence.
        </p>
      </div>
      <div className="flex justify-between items-center max-w-6xl mx-auto ">
        <p className="leading-8 text-lg w-[45%]">
          At <span className="text-rose-700">Blews&apos; Stitches</span>, fashion is more
          than what you wear — it’s a statement of identity, creativity, and
          purpose. Founded with a passion for style and self-expression, we
          design collections that blend modern trends with timeless appeal. Our
          mission is to empower individuals to look and feel their best,
          offering pieces that are as versatile and unique as the people who
          wear them. From everyday essentials to standout statements, we focus
          on quality, detail, and thoughtful design. Sustainability and ethical
          production are at the heart of what we do. We believe fashion should
          not only look good but do good — for the planet, for people, and for
          the future. Welcome to a brand where confidence is crafted, and style
          has a story.
        </p>
        {/* <Image
          src="/images/appPhotos/photo-10.jpg"
          alt="photo describing the about us"
          className=""
          fill
        /> */}
        <div className="relative h-[400px] w-[580px] rounded-[.9rem] overflow-hidden shadow-md shadow-black">
          <Image
            src="/images/appPhotos/photo-10.jpg"
            alt="photo describing the about us"
            className=""
            fill
          />
        </div>
      </div>
    </div>
  );
}
