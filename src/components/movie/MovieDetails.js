import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { AiFillHeart, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsFillMicFill, BsPlayFill } from 'react-icons/bs'
import { SiImdb } from 'react-icons/si'
import { TbNotes } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { imageUrl } from '../../utils/functions'

const MovieDetails = ({isActive, id}) => {
    const [data, setData] = useState({
        id: undefined,
        data: {},
        loading: false
    })

    useEffect(() => {
        if(isActive && data.id !== id) {
            setData({...data, loading: true})
            axios.get(`https://www.namava.ir/api/v1.0/medias/${id}/preview`)
            .then(response => {
                setData({
                    id,
                    data: response.data.result,
                    loading: false
                })
            })
            .catch(err => console.log(err))
        }
    }, [id])

    return (
        <div className={`preview-container ${isActive ? 'active-preview' : ''}` }>
            {data.loading ?
                <h1 className='preview-loading'>'loading'</h1>
            :
            <>
                <div className='movie-image'>
                    <img src={imageUrl(data.data?.coverLandscape)} />
                </div>
                <div className='movie-data'>
                    <h1>{data.data.caption}</h1>
                    <div className='movie-info'>
                        <h6 style={{background: '#F08453'}}> {data.data?.ageLimit} + </h6>
                        <h6> {data.data?.year} </h6>
                        {data.data?.mediaDuration && <h6> {data.data.mediaDuration} دقیقه</h6>}
                        {data.data?.imdb && <h6><SiImdb /> {data.data.imdb} </h6>}
                        <h6><AiFillHeart /> {data.data?.hit}% </h6>
                        {data.data?.hasExclusiveDub && <h6><BsFillMicFill /> دوبله نماوا </h6> }
                        {data.data?.hasPersianSubtitle && <h6><TbNotes /> زیرنویس </h6>}
                    </div>
                    <p>{data.data?.story}</p>
                    <h6 className='mt-4 mb-0'>{data.data?.teaserText}</h6>
                    <div className='movie-actions mb-4 mt-3'>
                        {data.data?.type === "Series" ?
                            <Button variant="light"> قسمت ها </Button>
                            :
                            <Button variant="light"><BsPlayFill /> خرید اشتراک </Button>
                        }
                        <Link to='/'><AiOutlineInfoCircle /> توضیحات بیشتر </Link>
                    </div>
                    {data.data?.casts && <div className='slider-cast'>
                        <span>ستارگان: </span>
                        {data.data.casts.map(cast => (
                            <Link to='/' key={cast.castId}> {cast.castName} </Link>
                        ))}
                    </div>}
                    {data.data?.director?.length > 0 && 
                    <div className='slider-cast'>
                        <span>کارگردان: </span>
                        {data.data.director.map(director => (
                            <Link to='/' key={director.castId}>{director.castName}</Link>
                        ))}
                    </div>}
                    {data.data?.categories?.length > 0 && 
                    <div className='slider-cast'>
                        <span>دسته بندی‌ها: </span>
                        {data.data.categories.map(cat => (
                            <Link to='/' key={cat.categoryId}> {cat.categoryName} </Link>
                        ))}
                    </div>}
                </div>
            </>
            }
        </div>
    )
}

export default MovieDetails
