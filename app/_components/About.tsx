"use client";

import { BiBullseye } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import styles from "@/styles/components.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import testimonies from "@/data/testimonies"

export default function About() {
  const swiper = useSwiper();

  return (
    <div className={styles.about}>
      <div className={styles.heading}>
        <BiBullseye className={styles.bull} />
        <h3>What we promise you at blews stitches</h3>
      </div>
      <p>
        You have come to a place where what you order is what you get. Stat at
        the comfort of your home and get killer dress tailored for your body
        size and uniqueness. We are keen on the inches - on specificity, on
        perfection - and on timely delivery. Take our word for it, but there is
        more... Take our clients&lsquo; words also!
      </p>
      <Swiper
        className={styles.swiper}
        // install Swiper modules
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{ prevEl: ".left-angle", nextEl: ".right-angle" }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {testimonies.map((testimony, i) => (
          <SwiperSlide key={i} className={`swiper-slide swiper-${i + 1}`}>
            {testimony.quote}
          </SwiperSlide>
        ))}
        <div className="left-angle" onClick={() => swiper.slidePrev()}>
          <FaAngleLeft />
        </div>
        <div
          className="right-angle"
          onClick={() => swiper.slideNext()}
        >
          <FaAngleRight />
        </div>
      </Swiper>
    </div>
  );
}
