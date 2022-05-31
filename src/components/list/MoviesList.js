import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import './MoviesList.scss'
import { Link } from "react-router-dom";
import {BiChevronLeft} from 'react-icons/bi'
import axios from "axios";
import { imageUrl } from "../../utils/functions";

const MoviesList = (props) => {
    const [items, setItems] = useState([])

    const fetchData = async () => {
        let {data} = await axios.get(`https://www.namava.ir/api/v1.0/post-groups/${props.data.payloadKey}/medias?pi=1&ps=20`)
        if(data.succeeded) {
            setItems(data.result)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                    <SwiperSlide key={item.id} >
                        <Link to='/'>
                            <img src={imageUrl(item.imageUrl)} />
                            <h6>{item.caption}</h6>
                        </Link>
                    </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default MoviesList
