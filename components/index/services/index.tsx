import React from "react";

import Section from '../section';

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, EffectCards, EffectCube, Keyboard, Navigation, Pagination} from "swiper";

import styles from './styles.module.css';

export default function Services() {
    return (
        <Section id='services' tittle='Servicios'>
            <Swiper
                autoplay={{ delay: 2500, disableOnInteraction: true }}
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
                    <img className={styles["carousel-image"]} src="/images/carousel 1.jpeg" alt="Carousel 1" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src="/images/carousel 2.jpeg" alt="Carousel 2" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src="/images/carousel 3.jpeg" alt="Carousel 3" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src="/images/carousel 4.jpeg" alt="Carousel 4" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src="/images/carousel 5.jpeg" alt="Carousel 5" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src="/images/carousel 6.jpeg" alt="Carousel 6" />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img className={styles["carousel-image"]} src="/images/carousel 7.jpeg" alt="Carousel 7" />
                </SwiperSlide>
            </Swiper>
        </Section>
    );
}




