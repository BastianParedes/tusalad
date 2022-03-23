import React from "react";

import Section from './section.jsx';

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, EffectCards, EffectCube, Keyboard, Navigation, Pagination} from "swiper";

import styles from '../styles/carousel.module.css';

export default function Services() {
    return (
        <Section id='services' tittle='Servicios'>
            <Swiper
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                effect="cube"
                className={styles['swiper']}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }}
                grabCursor={true}
                keyboard={{ enabled: true }}
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Autoplay, EffectCards, EffectCube, Keyboard, Navigation, Pagination]}
            >
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src={require("../images/carousel 1.jpg")} alt="Carousel 1" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src={require("../images/carousel 2.jpg")} alt="Carousel 2" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src={require("../images/carousel 3.jpg")} alt="Carousel 3" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src={require("../images/carousel 4.jpg")} alt="Carousel 4" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src={require("../images/carousel 5.jpg")} alt="Carousel 5" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src={require("../images/carousel 6.jpg")} alt="Carousel 6" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src={require("../images/carousel 7.jpg")} alt="Carousel 7" />
                </SwiperSlide>
            </Swiper>
        </Section>
    );
}




