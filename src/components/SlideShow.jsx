import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // For custom arrows

const slides = [
    "https://image.tmdb.org/t/p/original/3fNPjWlT0S2Pbn24hTx5cRQ0Ghz.jpg",
    "https://image.tmdb.org/t/p/original/aLM6fSRdFZzbHZGxP0VLfFQ5rB2.jpg",
    "https://image.tmdb.org/t/p/original/kOyQpMgA2br9h9t7VDaRao7I3Ok.jpg",
    "https://image.tmdb.org/t/p/original/xgDj56UWyeWQcxQ44f5A3RTWuSs.jpg",
    "https://image.tmdb.org/t/p/original/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    "https://image.tmdb.org/t/p/original/gnOJpIhP3kRUX3CUgOKVnmgr1Bx.jpg",
    "https://image.tmdb.org/t/p/original/3FmN6d7K4Xk4P1XQW6B9a4M4b2M.jpg",
    "https://image.tmdb.org/t/p/original/6ExRSxrs9N5RCWxb2eMAic4Wyzb.jpg"
  ];

const Slideshow = () => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full"
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="w-full 
                         h-[60vh] 
                         sm:h-[70vh] 
                         md:h-[80vh] 
                         lg:h-[90vh] 
                         object-cover 
                         brightness-90 
                         hover:brightness-100 
                         transition-all 
                         duration-500 
                         rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <button className="swiper-button-prev absolute top-1/2 left-3 sm:left-5 transform -translate-y-1/2 bg-black/50 p-4 sm:p-5 rounded-full text-white z-10 hover:bg-black/80 transition ease-in-out duration-300">
        <FaArrowLeft className="text-lg sm:text-2xl md:text-3xl" />
      </button>
      <button className="swiper-button-next absolute top-1/2 right-3 sm:right-5 transform -translate-y-1/2 bg-black/50 p-4 sm:p-5 rounded-full text-white z-10 hover:bg-black/80 transition ease-in-out duration-300">
        <FaArrowRight className="text-lg sm:text-2xl md:text-3xl" />
      </button>
    </div>
  );
};

export default Slideshow;
