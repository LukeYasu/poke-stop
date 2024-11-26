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

  function handlePrev() {
    setImgIndex((prev) =>
      prev <= 0 ? carouselImages.length - 1 : imgIndex - 1
    );
  }

  function handleClick() {
    const itemId = carouselImages[imgIndex].itemId;
    navigate(`/items/${itemId}`);
  }
  return (
    <div className="w-full flex justify-center carousel">
      <button className="carousel-button" onClick={handlePrev}>
        <img className="invert" src="left-arrow.png" />
      </button>
      <img
        className="carousel-img cursor-pointer"
        src={carouselImages[imgIndex].src}
        onClick={handleClick}
      />
      <button className="carousel-button" onClick={handleNext}>
        <img className="invert" src="right-arrow.png" />
      </button>
    </div>
  );
}
