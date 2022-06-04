import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { AiFillHeart, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsFillMicFill, BsPlayFill } from 'react-icons/bs'
import { SiImdb } from 'react-icons/si'
import { TbNotes } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { getItemUrl, imageUrl } from '../../utils/functions'

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

    function mediaDetails (caption, items, maxLength, keyType ) {
        let content = []
        if(items == '' || items.length === 0) {
            return
        }
        for (let i= 0; i < maxLength && i < items.length; i++) {
            content.push(<Link to='/' key={keyType}>{items[i][keyType + 'Name']}</Link>)
            content.push(<span to='/' key={keyType} className='seprator'> - </span>)
        }
        content.pop()
        return (
            <div className='slider-cast'>
                <span>{caption}: </span>
                {content}
            </div>
        )
    }

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
                        {data.data.type && <Link to={`/${data.data.type?.toLowerCase()}/${data.data.id}-${getItemUrl(data.data.caption)}`}><AiOutlineInfoCircle /> توضیحات بیشتر </Link>}
                    </div>
                    {data.data?.casts && mediaDetails('ستارگان', data.data.casts, 3, 'cast')}
                    {data.data?.directors &&  mediaDetails('کارگردان', data.data.director, 3, 'cast')}
                    {data.data?.categories && mediaDetails('دسته بندی‌ها', data.data.categories, 3, 'category')}

                </div>
            </>
            }
        </div>
    )
}

export default MovieDetails
