"use client";

import { FaBullseye, FaQuoteLeft, FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { Pagination } from "swiper/modules";


import styles from "@/styles/components.module.scss";
import "swiper/css";
import "swiper/css/pagination";

import testimonies from "@/data/testimonies";

export default function About() {
  const swiper = useSwiper()
  
  return (
    <div className={styles.about}>
      <div className={styles.heading}>
        <FaBullseye className={styles.bull} />
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
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className={styles.slider}
      >
        {testimonies.map((testimony, i) => (
          <SwiperSlide key={i + 1} className={styles.slide}>
            <blockquote className={styles.blockQuote}>
              <FaQuoteLeft className={styles.quote} />
              {testimony.quote}
            </blockquote>
            <div></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={styles.prev} onClick={() => swiper.slidePrev}>
        <FaAngleLeft />
      </button>
    </div>
  );
}
