"use client";
import {
  FaBullseye,
  FaQuoteLeft,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import styles from "@/styles/components.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import testimonies from "@/data/testimonies";
import { testimony } from "@/data/testimonies-2";
import Image from "next/image";
import Card from "./Card";

interface Testimony {
  fullName: string;
  image: string;
  alt: string;
  quote: string;
  skill: string;
  link: string;
}

function trimQuotes(testimonies: Testimony[]): Testimony[] {
  return testimonies.map((testimony) => {
    const words = testimony.quote.split(" ");
    if (words.length > 16) {
      testimony.quote = words.slice(0, 16).join(" ") + " ...";
    }
    return testimony;
  });
}

const trimmedTestimonies = trimQuotes(testimonies);

export default function About() {
  return (
    <>
      <div className={`${styles.about}`}>
        <div className={styles.heading}>
          <FaBullseye className={styles.bull} />
          <h3 className="font-semibold text-darkRose2">
            Our promise to you at blews stitches
          </h3>
        </div>
        <p className={styles.about_intro}>
          You have come to a place where what you order is what you get. Stay at
          the comfort of your home and get that killer dress tailored for your
          body size and uniqueness. We are keen on the inches - on specificity,
          on perfection - and on timely delivery. Take our word for it, but
          there is more... Take our clients&lsquo; words also!
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
          className={styles.slider}
        >
          {trimmedTestimonies.map((testimony, i) => (
            <SwiperSlide key={i + 1} className={styles.slide}>
              <blockquote className={styles.blockQuote}>
                <FaQuoteLeft className={styles.quote} />
                {testimony.quote}
              </blockquote>
              <div className="comment" />
              <div className="flex gap-3 items-center ml-[3rem] mt-[-.5rem]">
                <div className="relative w-[72px] h-[72px] overflow-hidden">
                  <Image
                    className="object-cover rounded-full"
                    src={testimony.image}
                    alt={testimony.alt}
                    fill
                    sizes="100%"
                  />
                </div>
                <cite className="flex flex-col">
                  <p className="text-sm">{testimony.fullName}</p>
                  <p className="text-xs">{testimony.skill}</p>
                </cite>
              </div>
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

      <div className="hidden md:flex md:flex-col md:gap-4 py-11 px-9 ">
        <div className="flex mx-auto gap-5 items-center">
          <FaBullseye className="text-2xl text-rose-950" />
          <h3 className="text-xl font-bold text-rose-900 capitalize">
            Our promise to you at{" "}
            <span className={`${styles.logo}`}>blews stitches</span>
          </h3>
        </div>
        <p className="text-lg text-darkRose2 mb-3 lg:px-8">
          You have come to a place where what you order is what you get. Stay at
          the comfort of your home and get that killer dress tailored for your
          body size and uniqueness. We are keen on the inches - on specificity,
          on perfection - and on timely delivery. Take our word for it, but
          there is more... Take our clients&lsquo; words also!
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
          className="max-w-[37rem] lg:max-w-[56rem]"
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
