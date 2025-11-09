import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Autoplay, Pagination } from "swiper/modules";
import "./carousel.css";
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/pagination";

import { assets } from "../../assets/frontend_assets/assets";

export default function CarouselHero() {
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    {
      title: " Bienvenue sur ShopMix",
      description: "Le meilleur site de vente en ligne.",
      bg: assets.img4,
      buttonText: "Nos produits",
      buttonLink: "#explore-menu",
    },
    {
      title: "Nature",
      description: "Inspirez-vous de la beauté du monde.",
      bg: assets.carousel1,
      buttonText: "Explore",
      buttonLink: "#",
    },
    {
      title: "City Life",
      description: "Vivez l’expérience urbaine ultime.",
      bg: assets.carousel2,
      buttonText: "Learn More",
      buttonLink: "#",
    },
    {
      title: "Adventure",
      description: "Partez à l’aventure avec style.",
      bg: assets.real,
      buttonText: "Get Started",
      buttonLink: "#",
    },
  ];

  return (
    <div className="hero-carousel">
      <Swiper
        speed={2000}
        parallax={true}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        modules={[Parallax, Autoplay, Pagination]}
        className="heroSwiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
      >
        <button
          className="arrow arrow-left"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Précédent"
        >
          ❮
        </button>

        <button
          className="arrow arrow-right"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Suivant"
        >
          ❯
        </button>

        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-bg" data-swiper-parallax="-20%" style={{ backgroundImage: `url(${slide.bg})` }}></div>

            <div className="hero-text" data-swiper-parallax="-300">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <a href={slide.buttonLink} className="hero-btn">{slide.buttonText}</a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
