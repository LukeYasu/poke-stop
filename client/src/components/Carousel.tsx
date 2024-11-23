import { useCallback, useEffect, useState } from 'react';
import { carouselImages } from '../lib/data';
import { useNavigate } from 'react-router-dom';

export function Carousel() {
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();
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

  function handleClick() {
    const itemId = carouselImages[imgIndex].itemId;
    navigate(`/items/${itemId}`);
  }
  return (
    <div className="w-full flex justify-center carousel">
      <img
        className="carousel-img cursor-pointer"
        src={carouselImages[imgIndex].src}
        onClick={handleClick}
      />
    </div>
  );
}
