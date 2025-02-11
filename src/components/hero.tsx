"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = ["/tes.jpg", "/tes.jpg", "/tes.jpg"];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="relative w-[80%] h-32 md:h-64 overflow-hidden m-auto rounded-lg mt-10 ">
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
