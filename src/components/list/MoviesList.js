import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { Link } from "react-router-dom";
import {BiChevronLeft} from 'react-icons/bi'
import { imageUrl } from "../../utils/functions";
import LazyLoad from 'react-lazyload';
import "swiper/css/pagination";
import "swiper/css";
import './MoviesList.scss'

const MoviesList = (props) => {
    const [items, setItems] = useState([])

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
        } else if (props.data && props.data.payloadType === "CategoryGroup") {
            axios.get(`https://www.namava.ir/api/v1.0/category-groups/${props.data.payloadKey}/latest-medias?pi=1&ps=20`)
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
        <div className='col-12 px-5 pt-2'>
            <div className='col-12 moviesListTitle'>
                <h6>{props.data && props.data.caption}</h6>
                <Link to='/'> مشاهده همه <BiChevronLeft /></Link>
            </div>
            <Swiper
                slidesPerView={7}
                spaceBetween={15}
                pagination={{clickable: true }}
                dir="rtl"
                className="moviesList"
            >
                {items.length > 0 && 
                    items.map(item => (
                        <SwiperSlide key={item.id || item.episodId} >
                            <Link to='/'>
                                <LazyLoad className="image-placeholder" >
                                    <img src={imageUrl(item.imageUrl || item.seriesImageUrl)} />
                                </LazyLoad>
                                <h6>{item.caption || item.seriesCaption }</h6>
                                <span>{item.episodCaption?.split('-')[1]}</span>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default MoviesList
