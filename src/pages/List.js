import axios from 'axios';
import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';
import { SiImdb } from 'react-icons/si';
import LazyLoad from 'react-lazyload';
import { Link, useLocation } from 'react-router-dom'
import Preview from '../components/movie/Preview';
import { imageUrl } from '../utils/functions';
import './List.scss'

const List = () => {
    const [itemData, setItemData] = useState({})
    const [previewState, setPreviewState] = useState({
        id: undefined,
        active: false
    })
    const location = useLocation();
    const data = location.state;

    const getItemDataHandler = (id) => {
        axios.get(`https://www.namava.ir/api/v1.0/medias/${id}/brief-preview`)
        .then(response => {
            setItemData(response.data.result)
        })
        .catch(err => console.log(err))
    }

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

    return (
        <Container fluid className='single-list'>
            <h6>{data.title}</h6>
            <Row className='moviesList'>
                {data.items.length > 0 && 
                    data.items.map(item => (
                        <div 
                            className='col-lg-2 swiper-slide'
                            onClick={() => togglePreview(item.id || item.seriesId)} 
                            onMouseEnter={() => getItemDataHandler(item.id || item.episodeId)}
                        >
                            <LazyLoad className="image-placeholder" >
                                <img src={imageUrl(item.imageUrl || item.seriesImageUrl)} />
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
                            <h6>{item.caption || item.seriesCaption }</h6>
                            <span>{item.episodCaption?.split('-')[1]}</span>
                        </div>
                    ))
                }       
            </Row>
            {<Preview id={previewState.id} isActive={previewState.active} />}

        </Container>
    )
}

export default List
