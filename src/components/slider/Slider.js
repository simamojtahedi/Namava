import axios from 'axios';
import React, { useEffect } from 'react'
import { useSlider, useSliderActions } from '../../context/SliderProvider';
import { Button, Carousel } from 'react-bootstrap';
import { getItemUrl, imageUrl } from '../../utils/functions';
import {AiOutlineInfoCircle} from 'react-icons/ai'
import {BsPlayFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import './slider.scss'

const Slider = ({sliderId}) => {
    const slider = useSlider()
    const dispatch = useSliderActions()

    const fetchSlider = async (dispatch, sliderId) => {
        dispatch({type: "SET_LOADING"})
        let data = await axios.get(`https://www.namava.ir/api/v2.0/medias/sliders/${sliderId}`)
        dispatch({
            type: "SET_ITEMS",
            id: sliderId,
            items: data.data.result,
        })
    }

    useEffect(() => {
       fetchSlider(dispatch, sliderId)
    }, [dispatch, sliderId])

    return (
        <div className='col-12 slider'>
            <Carousel fade indicators={false}>
                {slider.items.map(item => (
                <Carousel.Item className='slider-container' key={item.id}>
                    <img className="d-block w-100" src={imageUrl(item.coverLandscape)} alt="First slide" />
                    <Carousel.Caption>
                    <img className='mb-4' src={imageUrl(item.logoImageUrl)} alt="First slide" />
                    <h4 className='mb-3'>{item.caption}</h4>
                    <p>{item.story}</p>
                    <span className='mt-3'>{item.teaserText}</span>
                    <div className='actions mt-3 mb-4'>
                        <Button variant="light"><BsPlayFill />{item.isMarketable ? 'خرید بلیط' : ' خرید اشتراک'} </Button>
                        <Link to={`/${item.type.toLowerCase()}/${item.id}-${getItemUrl(item.caption)}`}><AiOutlineInfoCircle /> توضیحات بیشتر </Link>
                    </div>

                    <div className='slider-cast'>
                        <span>ستارگان: </span>
                        {item.casts.map(cast => (
                            <span key={cast.castId}> {cast.castName} </span>
                        ))}
                    </div>
                    {item.director.length > 0 && 
                    <div className='slider-cast'>
                        <span>کارگردان: </span>
                        {item.director.map(director => (
                            <span key={director.castId}>{director.castName}</span>
                        ))}
                    </div>}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
            </Carousel>
        </div>
    )
}

export default Slider
