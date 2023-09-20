import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

import "../stylesheet/slider.scss";

const Slider: React.FC = () => {
  const images = [
    "images/event1.jpg",
    "images/event2.jpg",
    "images/event2.jpg",
    "images/event2.jpg",
    "images/event2.jpg",
    "images/event2.jpg",
    "images/event1.jpg",
    "images/event1.jpg",
    "images/event1.jpg",
    "images/event1.jpg",
  ];

  return (
    <>
      <div className="Slider">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img className="Slider__image" src={image} alt={`${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
