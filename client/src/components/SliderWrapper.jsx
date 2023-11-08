// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import { sliderContent } from "../constant";
import SliderContent from "./SliderContent";

export default function SliderWrapper() {
  return (
    <Swiper
      className="mySwiper"
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {sliderContent.map((item) => (
        <SwiperSlide key={item.id}>
          <SliderContent book={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
