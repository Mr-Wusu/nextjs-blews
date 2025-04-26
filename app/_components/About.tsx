"use client";
import {
  FaBullseye,
  // FaQuoteLeft,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import styles from "@/styles/components.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import testimonies from "@/data/testimonies";
import { testimony } from "@/data/testimonies-2";
// import Image from "next/image";
import Card from "./Card";


export default function About() {
  
  return (
    <>
      <div className="flex flex-col md:gap-4 pt-11 lg:pt-14 px-9 lg:pb-8">
        <div className="flex mx-auto gap-5 items-center">
          <FaBullseye className="text-2xl text-rose-950" />
          <h3 className="text-[1.1rem] md:text-xl lg:text-2xl font-bold text-rose-900 capitalize">
            Our promise to you at{" "}
            <span className={`${styles.logo}`}>blews&apos; stitches</span>
          </h3>
        </div>
        <p className="leading-7  text-justify md:text-left md:text-lg lg:text-xl text-darkRose2  lg:px-20 mb-6">
          You have come to a place where style meets comfort. Stay anywhere and
          get that killer dress tailored for your body size and uniqueness. We
          are keen on the inches - on specificity, on perfection - and on timely
          delivery. Take our word for it, but there is more... Take our
          clients&lsquo; words also!
          {/* Welcome to Blews Stitches, where style meets comfort. We curate the finest
          clothing pieces to help you express your unique style and personality.
          */}
        </p>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: `.${styles.next}`,
            prevEl: `.${styles.prev}`,
          }}
          spaceBetween={20}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          className="max-w-[27rem] sm+:max-w-[31rem] md:max-w-[37rem] lg:max-w-[56rem] mx-auto "
        >
          {testimony.map((card, i) => (
            <SwiperSlide key={i + 1}>
              <Card card={card} />
            </SwiperSlide>
          ))}
          <button type="button" className={styles.prev}>
            <FaAngleLeft />
          </button>
          <button type="button" className={styles.next}>
            <FaAngleRight />
          </button>
        </Swiper>
      </div>
    </>
  );
}
