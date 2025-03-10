"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/carousel/carousel1.jpg",
  "/carousel/carousel2.jpg",
  "/carousel/carousel3.jpg",
  "/carousel/carousel4.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[90%] h-32 md:52 lg:h-64 overflow-hidden m-auto rounded-lg mt-10 ">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-32 md:h-64 object-cover"
              width={1200}
              height={300}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
