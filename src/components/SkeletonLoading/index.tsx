import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const SkeletonLoadingCards = () => {
  return (
    <div className="mt-8">
      <Swiper
        className="product-slider"
        spaceBetween={30}
        loop={false}
        autoplay={{ delay: 7500, disableOnInteraction: false }}
        initialSlide={0}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide>
          <div className="px-20 py-16 rounded-lg animate-pulse bg-gray-200 dark:bg-gray-250">
            <div className="flex flex-col items-center justify-center">
              <div className="hover:scale-105 transition-transform cursor-pointer bg-gray-200 dark:bg-gray-300 rounded">
                <div className="h-52 p-10 w-52"></div>
              </div>

              <div className="mt-8 text-xl w-52 text-center rounded-full bg-gray-200 dark:bg-gray-300 h-5"></div>

              <div className="mt-5 text-md w-52 rounded-full text-center bg-gray-200 dark:bg-gray-300 h-5 max-w-[380px]"></div>

              <div className="flex items-center justify-center w-[230px] mt-8 -mb-5 rounded px-8 py-2 h-12 bg-gray-200 dark:bg-gray-300"></div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-20 py-16 rounded-lg animate-pulse bg-gray-200 dark:bg-gray-250">
            <div className="flex flex-col items-center justify-center">
              <div className="hover:scale-105 transition-transform cursor-pointer bg-gray-200 dark:bg-gray-300 rounded">
                <div className="h-52 p-10 w-52"></div>
              </div>

              <div className="mt-8 text-xl w-52 text-center rounded-full bg-gray-200 dark:bg-gray-300 h-5"></div>

              <div className="mt-5 text-md w-52 rounded-full text-center bg-gray-200 dark:bg-gray-300 h-5 max-w-[380px]"></div>

              <div className="flex items-center justify-center w-[230px] mt-8 -mb-5 rounded px-8 py-2 h-12 bg-gray-200 dark:bg-gray-300"></div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-20 py-16 rounded-lg animate-pulse bg-gray-200 dark:bg-gray-250">
            <div className="flex flex-col items-center justify-center">
              <div className="hover:scale-105 transition-transform cursor-pointer bg-gray-200 dark:bg-gray-300 rounded">
                <div className="h-52 p-10 w-52"></div>
              </div>

              <div className="mt-8 text-xl w-52 text-center rounded-full bg-gray-200 dark:bg-gray-300 h-5"></div>

              <div className="mt-5 text-md w-52 rounded-full text-center bg-gray-200 dark:bg-gray-300 h-5 max-w-[380px]"></div>

              <div className="flex items-center justify-center w-[230px] mt-8 -mb-5 rounded px-8 py-2 h-12 bg-gray-200 dark:bg-gray-300"></div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
