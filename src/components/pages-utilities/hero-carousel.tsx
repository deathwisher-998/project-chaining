"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";

const Carousel = () => {
  // const [sliderRef] = useKeenSlider({
  //   loop: true,
  //   mode: "free-snap",
  //   slides: { perView: 1, spacing: 15 },
  // });

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  const slides = [
    { id: 1, image: "/image/slide1.jpeg", title: "Beautiful Nature" },
    { id: 2, image: "/image/slide2.jpeg", title: "Peaceful Lake" },
    { id: 3, image: "/image/slide3.jpeg", title: "Sunset Vibes" },
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
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[450px] md:h-[650px]  object-cover md:object-fill"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Carousel;
