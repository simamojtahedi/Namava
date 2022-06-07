import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { AiFillHeart } from 'react-icons/ai'
import { BsFillMicFill } from 'react-icons/bs'
import { SiImdb } from 'react-icons/si'
import LazyLoad from 'react-lazyload'
import { useParams } from 'react-router'
import { Swiper, SwiperSlide } from "swiper/react";
import Preview from '../components/movie/Preview'
import { imageUrl } from '../utils/functions'
import './ActorPage.scss'

const ActorPage = () => {
    const [items, setItems] = useState([])
    const [itemData, setItemData] = useState({})
    const [previewState, setPreviewState] = useState({
        id: undefined,
        active: false
    })
    let {id} = useParams()

    const togglePreview = id => {
        setPreviewState(prevState => {
            let newState = {...prevState};
            if(id !== prevState.id) {
                newState.id = id;
                newState.active = true;
            } else {
                newState.active = !prevState.active
            }
            return newState
        })
    }

    useEffect(() => {
        axios.get(`https://www.namava.ir/api/v1.0/casts/${id.split('-')[0]}`)
        .then(response => {
            console.log(response.data.result)
            setItems(response.data.result)
        })
    }, [id])

    const getItemDataHandler = (id) => {
        axios.get(`https://www.namava.ir/api/v1.0/medias/${id}/brief-preview`)
        .then(response => {
            setItemData(response.data.result)
        })
        .catch(err => console.log(err))
    }

    console.log(items)
    return (
        <Container fluid className='p-0'>
            <div className='actor-container'>
                <div className='actor-header'>
                    <img src={imageUrl(items?.imageUrl)} />
                    <div>
                        <h1>بیوگرافی {items?.castName}</h1>
                        <p dangerouslySetInnerHTML={{__html: items?.fullDescription}}></p>
                    </div>
                </div>
                <div className='px-2'>
                <Swiper
                    slidesPerView={7.2}
                    spaceBetween={15}
                    pagination={{clickable: true }}
                    dir="rtl"
                    className="moviesList"
                >
                    {items.medias?.length > 0 && 
                        items.medias.map(item => (
                            <SwiperSlide 
                                onClick={() => togglePreview(item.mediaId)} 
                                key={item.mediaId} 
                                onMouseEnter={() => getItemDataHandler(item.mediaId)}
                                className={(item.mediaId) === previewState.id && previewState.active && 'activeMovie'}
                            >
                                <LazyLoad className="image-placeholder" >
                                    <img src={imageUrl(item.imageUrl)} />
                                    <div className='brief-data'>
                                        <div>
                                            <h6>{item.type === "Series" ? 'سریال' : 'فیلم'} </h6> {' - '} 
                                            <h6> {itemData.year}</h6>
                                        </div>
                                        {itemData.hit > 0 && <h6><AiFillHeart /> {itemData.hit}% </h6>}
                                        {itemData.imdb && <h6><SiImdb /> {itemData.imdb} </h6>}
                                        {itemData.hasPersianSubtitle && <h6><BsFillMicFill /> دوبله نماوا </h6>}
                                    </div>
                                </LazyLoad>
                                <h6>{item.caption}</h6>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            {<Preview id={previewState.id} isActive={previewState.active} />}
        </div>
        </Container>
    )
}

export default ActorPage

