import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const Slider = ({ slides }) => {
    return (
        <Splide
            options={{
                type: 'slide',
                rewind: true,
                perPage: 2,
                perMove: 4,
                pagination: false,
                gap: '1rem',
                autoWidth: true,
                arrows: true,
            }}>
                {slides.map((slide, index) => (
                    <SplideSlide key={index}>
                        <img src={slide.image} alt={slide.alt} />
                    </SplideSlide>
                ))}
        </Splide>
    )
}

export default Slider;