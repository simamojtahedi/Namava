import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { Link } from "react-router-dom";
import {BiChevronLeft} from 'react-icons/bi'
import { imageUrl } from "../../utils/functions";
import LazyLoad from 'react-lazyload';
import "swiper/css/pagination";
import "swiper/css";
import './CastList.scss'

const CastList = (props) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get(`https://www.namava.ir/api/v1.0/casts/collection/${props.data.payloadKey}?pi=1&ps=20`)
        .then(res => {
            setItems(res.data.result)
        })
    }, [props.data])

    return (
        <div className='col-12 px-5 pt-2'>
            <div className='col-12 castsListTitle'>
                <h6>{props.data && props.data.caption}</h6>
                <Link to='/'> مشاهده همه <BiChevronLeft /></Link>
            </div>
            <Swiper
                slidesPerView={7.2}
                spaceBetween={15}
                pagination={{clickable: true }}
                dir="rtl"
                className="castsList"
            >
                {items.length > 0 && 
                    items.map(item => (
                        <SwiperSlide key={item.castId} >
                            <Link to={`/person-${item.castId}-${item.castName}`}>
                                <LazyLoad className="cast-placeholder" >
                                    <img src={imageUrl(item.castImageUrl)} />
                                </LazyLoad>
                                <h6>{item.castName }</h6>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default CastList

