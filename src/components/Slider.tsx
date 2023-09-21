// import { Swiper, SwiperSlide } from "swiper/react";

// import { Navigation, Pagination, EffectCoverflow } from "swiper";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

import "../stylesheet/slider.scss";

const Slider: React.FC = () => {
  // const images = [
  //   "images/event1.jpg",
  //   "images/event2.jpg",
  //   "images/event2.jpg",
  //   "images/event2.jpg",
  //   "images/event2.jpg",
  //   "images/event2.jpg",
  //   "images/event1.jpg",
  //   "images/event1.jpg",
  //   "images/event1.jpg",
  //   "images/event1.jpg",
  // ];

  return (
    <>
      <div className="Slider">
        {/* <Swiper
          modules={[EffectCoverflow, Pagination, Navigation]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="Swiper__container"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img className="Slider__image" src={image} alt={`${index + 1}`} />
            </SwiperSlide>
          ))}
          <div className="Swiper__controller">
            <div className="swiper-button-prev slider-arrow">
              <div className="arrow-back-outline">1</div>
            </div>
            <div className="swiper-button-next slider-arrow">
              <div className="arrow-forward-outline">2</div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper> */}
      </div>
    </>
  );
};

export default Slider;
