import { useCallback, useEffect, useState } from 'react';
import { carouselImages } from '../lib/data';

export function Carousel() {
  const [imgIndex, setImgIndex] = useState(0);
  const handleNext = useCallback(() => {
    if (imgIndex >= carouselImages.length - 1) {
      setImgIndex(0);
    } else {
      setImgIndex(imgIndex + 1);
    }
  }, [imgIndex]);
  useEffect(() => {
    const timeoutId = setTimeout(() => handleNext(), 5000);
    return () => clearTimeout(timeoutId);
  }, [handleNext]);
  return (
    <div className="w-full flex justify-center carousel">
      <img className="carousel-img" src={carouselImages[imgIndex].src} />
    </div>
  );
}
