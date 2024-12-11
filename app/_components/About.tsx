"use client";

import { BiBullseye } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import styles from "@/styles/components.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import testimonies from "@/data/testimonies";

export default function About() {
  const swiper = useSwiper();

  return (
    <div className={styles.about}>
      <div className={styles.heading}>
        <BiBullseye className={styles.bull} />
        <h3>What we promise you at blews stitches</h3>
      </div>
      <p>
        You have come to a place where what you order is what you get. Stay at
        the comfort of your home and get that killer dress tailored for your
        body size and uniqueness. We are keen on the inches - on specificity, on
        perfection - and on timely delivery. Take our word for it, but there is
        more... Take our clients&lsquo; words also!
      </p>
      <Swiper
        className={styles.swiper}
        // install Swiper modules
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {testimonies.map((testimony, i) => (
          <SwiperSlide key={i} className={`swiper-slide swiper-${i + 1}`}>
            {testimony.quote}
          </SwiperSlide>
        ))}
        <button
          className={styles.leftAngle}
          type="button"
          onClick={() => swiper.slidePrev()}
        >
          <FaAngleLeft />
        </button>
        <button
          className={styles.rightAngle}
          type="button"
          onClick={() => swiper.slideNext()}
        >
          <FaAngleRight />
        </button>
      </Swiper>
    </div>
  );
}
