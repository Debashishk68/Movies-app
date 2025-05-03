import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const TopMovies = () => {
  const movies = ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4'];

  return (
    <>
      <h2 className="text-3xl font-bold text-red-500 mb-6">Top Movies</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {movies.map((movie, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 h-64 flex items-center justify-center text-2xl font-semibold hover:scale-105 transition-transform">
              {movie}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TopMovies;
