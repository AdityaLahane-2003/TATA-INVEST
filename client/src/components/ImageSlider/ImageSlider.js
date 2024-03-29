import React, { useState, useEffect } from "react";

const slideStyles = {
  width: "100%",
  height: "70vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "16px", // Adjust right spacing responsively
  fontSize: "40px", // Adjust font size responsively
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
  transition: "opacity 0.3s ease", // Add smooth opacity transition
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "16px", // Adjust left spacing responsively
  fontSize: "40px", // Adjust font size responsively
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
  transition: "opacity 0.3s ease", // Add smooth opacity transition
};

const sliderStyles = {
  position: "relative",
  height: "100%",
  overflow: "hidden", // Hide overflow for rounded corners
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px", // Adjust top margin responsively
  marginBottom: "0", // Remove bottom margin
};

const dotStyle = {
  margin: "0 5px", // Adjust dot spacing responsively
  cursor: "pointer",
  fontSize: "20px", // Adjust dot size responsively,
  color: "#ccc", // Set inactive dot color
  transition: "transform 0.3s ease", // Add smooth transform transition
};

const activeDotStyle = {
  ...dotStyle,
  transform: "scale(1.2)", // Scale up active dot
  color: "#000", // Set active dot color
};

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentIndex, slides]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <div style={sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
      <div style={slideStylesWidthBackground}></div>
      <div style={dotsContainerStyles}>
      {slides.map((slide, slideIndex) => (
        <div
          style={slideIndex === currentIndex ? activeDotStyle : dotStyle}
          key={slideIndex}
          onClick={() => goToSlide(slideIndex)}
        >
          ●
        </div>
      ))}

      </div>
    </div>
  );
};

export default ImageSlider;
