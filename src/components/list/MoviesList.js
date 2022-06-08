import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { Link } from "react-router-dom";
import {BiChevronLeft} from 'react-icons/bi'
import {AiFillHeart} from 'react-icons/ai'
import {SiImdb} from 'react-icons/si'
import {BsFillMicFill} from 'react-icons/bs'
import { imageUrl } from "../../utils/functions";
import LazyLoad from 'react-lazyload';
import './MoviesList.scss'
import Preview from "../movie/Preview";

const MoviesList = (props) => {
    const [items, setItems] = useState([])
    const [itemData, setItemData] = useState({})
    const [previewState, setPreviewState] = useState({
        id: undefined,
        active: false
    })

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

    // const briefData = useBriefData()
    // const dispatch = useBriefDataActions()

    const getItemDataHandler = (id) => {
        axios.get(`https://www.namava.ir/api/v1.0/medias/${id}/brief-preview`)
        .then(response => {
            setItemData(response.data.result)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if(props.data && props.data.payloadType === "PostGroup") {
            axios.get(`https://www.namava.ir/api/v1.0/post-groups/${props.data.payloadKey}/medias?pi=1&ps=20`)
            .then(res => {
                setItems(res.data.result)
            })
        } else if (props.data && props.data.payloadType === "Latest") {
            axios.get(`https://www.namava.ir/api/v1.0/medias/latest?pi=1&ps=20`)
            .then(res => {
                setItems(res.data.result)
            })
        } else if (props.data && props.data.payloadType === "LatestEpisods") {
            axios.get(`https://www.namava.ir/api/v1.0/medias/latest-episods?pi=1&ps=20`)
            .then(res => {
                setItems(res.data.result)
            })
        } else if (props.data && props.data.payloadType === "ExclusiveDubs") {
            axios.get(`https://www.namava.ir/api/v1.0/medias/exclusive-dubs?pi=1&ps=20`)
            .then(res => {
                setItems(res.data.result)
            })
        }
    }, [props.data])

    return (
        <div className='p-0'>
            <div className='col-12 px-5 pt-2'>
                <div className='col-12 moviesListTitle'>
                    <h6>{props.data && props.data.caption}</h6>
                    {props.data &&
                        <Link to='/list' state={{
                                items,
                                title: props.data?.caption,
                                showList: true
                        }}> مشاهده همه <BiChevronLeft /></Link>
                    }
                </div>
                <Swiper
                    slidesPerView={7.2}
                    spaceBetween={15}
                    pagination={{clickable: true }}
                    dir="rtl"
                    className="moviesList"
                    breakpoints={{
                        640: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 4,
                          spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 7.2,
                            spaceBetween: 15,
                        }
                      }}
                >
                    {items.length > 0 && 
                        items.map(item => (
                            <SwiperSlide 
                                onClick={() => togglePreview(item.id || item.seriesId)} 
                                key={item.id || item.episodId} 
                                onMouseEnter={() => getItemDataHandler(item.id || item.episodeId)}
                                className={(item.episodId || item.id) === previewState.id && previewState.active && 'activeMovie'}
                            >
                                <Link to='/'>
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
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            {<Preview id={previewState.id} isActive={previewState.active} />}
        </div>
    )
}

export default MoviesList
