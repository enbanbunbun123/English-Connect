import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../stylesheet/slider.scss";

import SlickSlider from "react-slick";

const Slider: React.FC = () => {
  const images = [
    "images/event1.jpg",
    "images/event1.jpg",
    "images/event1.jpg",
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidestoScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <>
      <div className="Slider">
        <SlickSlider {...settings}>
          {images.map((image, index) => (
            <div className="Slider__image" key={index}>
              <img src={image} alt={`${index + 1}`} />
            </div>
          ))}
        </SlickSlider>
      </div>
    </>
  );
};

export default Slider;
