import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsFillMicFill, BsPlayFill, BsPlusLg, BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs'
import { TbNotes } from 'react-icons/tb'
import './singlePage.scss'
import { imageUrl } from '../../utils/functions'
import { SiImdb } from 'react-icons/si'
import Select from 'react-select';
import SingglePageSeasons from './SingglePageSeasons'


const SinglePageHeader = ({data}) => {
    const [selectedOption, setSelectedOption] = useState({
        value: data?.seasons ? data?.seasons[0].seasonId : 0,
        label: data?.seasons ? `فصل ${data?.seasons[0].seasonOrderId}` : ''
    });
    function mediaDetails (caption, items, maxLength, keyType ) {
        let content = []
        if(items == '' || items.length === 0) {
            return
        }
        for (let i= 0; i < maxLength && i < items.length; i++) {
            content.push(<span to='/' key={items[i].categoryId || items[i].castId}>{items[i][keyType + 'Name']}</span>)
            content.push(<span to='/' key={`seprator${items[i].categoryId || items[i].castId}`} className='seprator'> - </span>)
        }
        content.pop()
        return (
            <div className='single-page-cast mb-3'>
                <span>{caption}: </span>
                {content}
            </div>
        )
    }

    const options = data?.seasons?.map(item => (
        {
            value: item.seasonId,
            label: `فصل ${item.seasonOrderId}`
        }
    ))

    const colourStyles = {
        option: (styles) => {
          return {
            ...styles,
            backgroundColor: '#fff',
            color: '#000',
          };
        },
    };

    return (
        <>
            <div className='single-page-header'>
                <div className="header-bg" >
                    <img src={imageUrl(data?.coverLandscape)} alt="image-header" />
                </div>
                <div className='single-page-header-info'>
                    <img className='mb-4 logo' src={imageUrl(data?.logoImageUrl)} alt="logo" />
                    <div className='single-page-data'>
                        <h1 className='mb-3'>{data?.caption}</h1>
                        <div className='single-page-info'>
                            <h6> {data?.year} </h6>
                            {data?.mediaDuration && <h6> {data?.mediaDuration} دقیقه</h6>}
                            {data?.imdb && <h6><SiImdb /> {data?.imdb} </h6>}
                            <h6><AiFillHeart /> {data?.hit}% </h6>
                            {data?.hasExclusiveDub && <h6><BsFillMicFill /> دوبله نماوا </h6> }
                            {data?.hasPersianSubtitle && <h6><TbNotes /> زیرنویس </h6>}
                        </div>
                        <p className='mt-3 mb-1'>{data?.story}</p>
                        <h6 className='mt-4 mb-0'>{data?.teaserText}</h6> 
                        <div className='single-page-actions mb-4 mt-4'>
                            <Button variant="light"><BsPlayFill /> خرید اشتراک </Button>
                            <Button> پیش نمایش </Button>
                            <Button className='rounded'> <BsPlusLg /> </Button>
                            <Button className='rounded'> <BsHandThumbsUp /> </Button>
                            <Button className='rounded'>  <BsHandThumbsDown /> </Button>
                        </div>

                        {data?.casts && mediaDetails('ستارگان', data?.casts, 3, 'cast')}

                        <div className='age'>
                            <span style={{background: '#F08453'}}> {data?.ageRange.value} + </span>
                            <span> {data?.ageRange.caption} </span>
                        </div>                    

                        {data?.type === 'Series' && 
                        <div className='seasons mt-5'>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                styles={colourStyles}
                            />
                            <div className='seasons-data'>
                                <span>تعداد کل فصل‌ها: {data?.seasons.length}</span>
                                <span> | </span>
                                <span>وضعیت پخش: {data?.episodeReleaseTime}</span>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
            {selectedOption.value ? <SingglePageSeasons seasonId={selectedOption.value} /> : ''}
        </>
    )
}

export default SinglePageHeader
