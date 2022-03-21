import React from "react";

import '../styles/carousel.css';

import Section from './section.jsx';

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, EffectFlip, Keyboard, Navigation, Pagination} from "swiper";



export default function Services() {
    return (
        <Section id='services' tittle='Servicios'>
            <Swiper
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                effect="flip"
                grabCursor={true}
                keyboard={{ enabled: true }}
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Autoplay, EffectFlip, Keyboard, Navigation, Pagination]}
            >
                <SwiperSlide>
                    <img className="carousel-image" src={require("../images/carousel 1.jpg")} alt="Carousel 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="carousel-image" src={require("../images/carousel 2.jpg")} alt="Carousel 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="carousel-image" src={require("../images/carousel 3.jpg")} alt="Carousel 3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="carousel-image" src={require("../images/carousel 4.jpg")} alt="Carousel 4" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="carousel-image" src={require("../images/carousel 5.jpg")} alt="Carousel 5" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="carousel-image" src={require("../images/carousel 6.jpg")} alt="Carousel 6" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className="carousel-image" src={require("../images/carousel 7.jpg")} alt="Carousel 7" />
                </SwiperSlide>
            </Swiper>
        </Section>
    );
}




