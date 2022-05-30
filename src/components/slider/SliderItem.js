import React from 'react'
import styled from 'styled-components';


const Slide = styled.div`
        background-image: linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 46.875vw), linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%), 
        url(${props => props["imageUrl"]});
        min-height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        padding-bottom: 40px;
    `;

const SliderItem = () => {
    return (
        <div className='slider-container'>
            <Slide imageUrl={"https://www.komar.de/en/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4113_star_wars_movie_poster_rey_ma.jpg"} />
        </div>
    )
}

export default SliderItem
