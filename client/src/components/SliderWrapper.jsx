// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import SliderContent from "./SliderContent";
import useSlider from "../hooks/useSlider";

export default function SliderWrapper() {
  const { slider, isLoading, isError } = useSlider();

  {
    return !isLoading && !isError ? (
      <Swiper
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {slider.length > 0 &&
          slider.map((item) => (
            <SwiperSlide key={item._id}>
              <SliderContent book={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    ) : (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}
