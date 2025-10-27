"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";

const Carousel = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  const slides = [
    { id: 1, image: "/image/slide1.png", title: "Beautiful Nature" },
    { id: 2, image: "/image/slide2.png", title: "Peaceful Lake" },
    { id: 3, image: "/image/slide3.png", title: "Sunset Vibes" },
  ];

  return (
    <main>
      <div className="w-[100%]">
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="keen-slider__slide flex items-center justify-center bg-gray-200 overflow-hidden relative cursor-grab"
            >
              <div
                className="w-full h-[225px] md:h-[650px] bg-gray-200 front-slider-hero"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Carousel;
