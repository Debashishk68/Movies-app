import React, { useState, useEffect, useRef } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { useHistory } from 'react-router';

SwiperCore.use([Autoplay]);

const HeroSlide = () => {
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results.slice(1, 4));
            } catch {
                console.log('error');
            }
        };
        getMovies();
    }, []);

    return (
        <div className="mb-12">
            <Swiper grabCursor={true} spaceBetween={0} slidesPerView={1}>
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <HeroSlideItem item={item} isActive={isActive} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movieItems.map((item, i) => <TrailerModal key={i} item={item} />)}
        </div>
    );
};

const HeroSlideItem = ({ item, isActive }) => {
    const history = useHistory();
    const background = apiConfig.originalImage(item.backdrop_path || item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdbApi.getVideos(category.movie, item.id);
        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }
        modal.classList.toggle('active');
    };

    return (
        <div
            className={`relative bg-cover bg-center py-36 ${isActive ? 'active' : ''}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute inset-0 bg-black/50 z-0"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0f0f0f] to-transparent z-0"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center container mx-auto px-4">
                <div className="w-full lg:w-1/2 px-6 space-y-6">
                    <h2 className={`text-5xl font-bold text-white transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-24'}`}>
                        {item.title}
                    </h2>
                    <p className={`text-white font-semibold transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0 delay-150' : 'opacity-0 -translate-y-24'}`}>
                        {item.overview}
                    </p>
                    <div className={`flex gap-4 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 -translate-y-24'}`}>
                        <Button onClick={() => history.push('/movie/' + item.id)}>Watch now</Button>
                        <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
                    </div>
                </div>
                <div className="hidden lg:flex justify-center items-start w-full lg:w-1/2 px-6">
                    <img
                        src={apiConfig.w500Image(item.poster_path)}
                        alt=""
                        className={`rounded-xl shadow-xl transform transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-0'}`}
                        width={400}
                    />
                </div>
            </div>
        </div>
    );
};

const TrailerModal = ({ item }) => {
    const iframeRef = useRef(null);
    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    );
};

export default HeroSlide;
