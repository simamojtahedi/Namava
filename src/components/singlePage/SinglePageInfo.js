import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { imageUrl } from "../../utils/functions";
import LazyLoad from 'react-lazyload';

const SinglePageInfo = ({data, recommend}) => {
    function mediaDetails (caption, items, maxLength, keyType ) {
        let content = []
        if(items == '' || items.length === 0) {
            return
        }
        for (let i= 0; i < maxLength && i < items.length; i++) {
            content.push(<Link to='/' key={keyType}>{items[i][keyType]}</Link>)
            content.push(<span to='/' key={keyType} className='seprator'> - </span>)
        }
        content.pop()
        return (
            <div className='single-page-cast mt-2'>
                <span>{caption}: </span>
                {content}
            </div>
        )
    }

    return (
        <div className='single-page-maininfo mt-4'>
            <h6 className='mb-3'>{data?.movieLatinName}</h6>
            <h6>درباره {data?.type === "Series" ? 'سریال' : 'فیلم'} {data?.caption}</h6>
            <div dangerouslySetInnerHTML={{__html: data?.about}} className='mt-4 mb-5'></div>
        
            <div className='single-page-list'>
                {data?.categories && mediaDetails('دسته بندی‌ها', data?.categories, 3, 'categoryName')}
                {data?.voiceList && mediaDetails('صدا', data?.voiceList, 3, 'name')}
                {data?.subtitleList && mediaDetails('زیرنویس', data?.subtitleList, 3, 'name')}
            </div>

            <div className='casts mt-5'>
                <h5>بازیگران</h5>
                <Swiper
                    slidesPerView={7.2}
                    spaceBetween={15}
                    pagination={{clickable: true }}
                    dir="rtl"
                    className="castsList single-page-casts mt-5"
                >
                    {data?.casts.length > 0 && 
                        data.casts.filter(item => item.castRole === 'Actor').map(item => (
                            <SwiperSlide key={item.castId} >
                                <Link to='/'>
                                    <LazyLoad className="cast-placeholder" >
                                        <img src={item.castImageUrl ? imageUrl(item.castImageUrl) : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDciIGhlaWdodD0iMTQ3IiB2aWV3Qm94PSIwIDAgMTQ3IDE0NyI+CiAgICA8ZyBpZD0iR3JvdXBfMTk4MyIgZGF0YS1uYW1lPSJHcm91cCAxOTgzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjc4IC0yMzEzKSI+CiAgICAgIDxwYXRoIGlkPSJTdWJ0cmFjdGlvbl8yIiBkYXRhLW5hbWU9IlN1YnRyYWN0aW9uIDIiIGQ9Ik0xODk5LjUsNjA0NWE3My4xNTQsNzMuMTU0LDAsMCwxLTQxLjA5NS0xMi41NTMsNzMuNzE5LDczLjcxOSwwLDAsMS0yNi42My0zMi4zMzgsNzMuNCw3My40LDAsMCwxLDYuNzc3LTY5LjcsNzMuNzE2LDczLjcxNiwwLDAsMSwzMi4zMzgtMjYuNjMsNzMuNCw3My40LDAsMCwxLDY5LjcsNi43NzcsNzMuNzE4LDczLjcxOCwwLDAsMSwyNi42MywzMi4zMzgsNzMuNCw3My40LDAsMCwxLTYuNzc3LDY5LjcsNzMuNzE3LDczLjcxNywwLDAsMS0zMi4zMzgsMjYuNjNBNzMuMDQzLDczLjA0MywwLDAsMSwxODk5LjUsNjA0NVptLS4yNjEtMzguNTg3YTcuNTUyLDcuNTUyLDAsMCwxLDMuNDc3Ljg1NGwyMi42NTUsMTEuODVhNy41LDcuNSwwLDAsMCwzLjQ4Mi44NjksNy42MjMsNy42MjMsMCwwLDAsNS43NTYtMi43LDcuMjUzLDcuMjUzLDAsMCwwLDEuNi02bC00LjMyNC0yNS4wOTRhNy4zOTQsNy4zOTQsMCwwLDEsMi4xNDUtNi41NzVsMTguMzMxLTE3Ljc3NGE3LjMyMSw3LjMyMSwwLDAsMCwxLjktNy42LDcuMzcyLDcuMzcyLDAsMCwwLTYuMDM2LTUuMDc0bC0yNS4zMzMtMy42NjRhNy40NTQsNy40NTQsMCwwLDEtNS42MjQtNC4wNjNsLTExLjMyNy0yMi44MzFhNy40MjYsNy40MjYsMCwwLDAtMi44NjctMy4xMDcsNy42MTcsNy42MTcsMCwwLDAtNy42NzQsMCw3LjQyOCw3LjQyOCwwLDAsMC0yLjg2NywzLjEwN2wtMTEuMzI4LDIyLjgzMWE3LjQ1Miw3LjQ1MiwwLDAsMS01LjYyMiw0LjA2M2wtMjUuMzM0LDMuNjY0YTcuNCw3LjQsMCwwLDAtNC4xMzksMTIuNjc3bDE4LjMzLDE3Ljc3NGE3LjQsNy40LDAsMCwxLDIuMTQ3LDYuNTc1bC00LjMyNSwyNS4wOTRhNy4yNTIsNy4yNTIsMCwwLDAsMS42MDUsNiw3LjYyNCw3LjYyNCwwLDAsMCw1Ljc1NiwyLjcsNy41MDksNy41MDksMCwwLDAsMy40ODMtLjg2OWwyMi42NTUtMTEuODVBNy41NDMsNy41NDMsMCwwLDEsMTg5OS4yNCw2MDA2LjQxM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNTQ4IC0zNTg1KSIgZmlsbD0iIzM0MzQzNCIvPgogICAgICA8ZyBpZD0iaWNfbWVudV9wcm9maWxlMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzI5Ljg4MSAyMzYzLjg5MikiPgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMzY5IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAzNjkiIHdpZHRoPSIxNC44MDkiIGhlaWdodD0iMTQuODA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMy43NzIgMTUuMjk0KSIgZmlsbD0ibm9uZSIvPgogICAgICAgIDxnIGlkPSJHcm91cF8xMjMzIiBkYXRhLW5hbWU9Ikdyb3VwIDEyMzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiPgogICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNDgwMSIgZGF0YS1uYW1lPSJQYXRoIDQ4MDEiIGQ9Ik0yODYuOTgzLDEzOTQuMzQ0YTI0LjY3OSwyNC42NzksMCwwLDAsMTkuODM2LTkuOTksNi40NjksNi40NjksMCwwLDAsMS02LjAyOSwxMy45NTUsMTMuOTU1LDAsMCwwLTguMjgzLTguMTgzLDQsNCwwLDAsMC0zLjY3My4zNjUsMTUuNDA3LDE1LjQwNywwLDAsMS0xNy43NjgsMCwzLjk4NCwzLjk4NCwwLDAsMC0zLjY0NS0uMzczLDEzLjk1LDEzLjk1LDAsMCwwLTguMjgzLDguMTE1LDYuNDY3LDYuNDY3LDAsMCwwLDEuMDg2LDYuMTQ3QTI1LjMsMjUuMywwLDAsMCwyODYuOTgzLDEzOTQuMzQ0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2NS44MTggLTEzNDguOTQ3KSIgZmlsbD0iIzM0MzQzNCIvPgogICAgICAgICAgPGVsbGlwc2UgaWQ9IkVsbGlwc2VfMTA5IiBkYXRhLW5hbWU9IkVsbGlwc2UgMTA5IiBjeD0iMTAuNTkxIiBjeT0iMTAuNTkxIiByeD0iMTAuNTkxIiByeT0iMTAuNTkxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC41NzUpIiBmaWxsPSIjMzQzNDM0Ii8+CiAgICAgICAgPC9nPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9zdmc+'} />
                                    </LazyLoad>
                                    <h6>{item.castName }</h6>
                                    <h6>بازیگر</h6>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

            <div className='casts mt-5'>
                <h5>عوامل</h5>
                <Swiper
                    slidesPerView={7.2}
                    spaceBetween={15}
                    pagination={{clickable: true }}
                    dir="rtl"
                    className="castsList single-page-casts mt-5"
                >
                    {data?.casts.length > 0 && 
                        data.casts.filter(item => item.castRole !== 'Actor').map(item => (
                            <SwiperSlide key={item.castId} >
                                <Link to='/'>
                                    <LazyLoad className="cast-placeholder" >
                                        <img src={item.castImageUrl ? imageUrl(item.castImageUrl) : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDciIGhlaWdodD0iMTQ3IiB2aWV3Qm94PSIwIDAgMTQ3IDE0NyI+CiAgICA8ZyBpZD0iR3JvdXBfMTk4MyIgZGF0YS1uYW1lPSJHcm91cCAxOTgzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjc4IC0yMzEzKSI+CiAgICAgIDxwYXRoIGlkPSJTdWJ0cmFjdGlvbl8yIiBkYXRhLW5hbWU9IlN1YnRyYWN0aW9uIDIiIGQ9Ik0xODk5LjUsNjA0NWE3My4xNTQsNzMuMTU0LDAsMCwxLTQxLjA5NS0xMi41NTMsNzMuNzE5LDczLjcxOSwwLDAsMS0yNi42My0zMi4zMzgsNzMuNCw3My40LDAsMCwxLDYuNzc3LTY5LjcsNzMuNzE2LDczLjcxNiwwLDAsMSwzMi4zMzgtMjYuNjMsNzMuNCw3My40LDAsMCwxLDY5LjcsNi43NzcsNzMuNzE4LDczLjcxOCwwLDAsMSwyNi42MywzMi4zMzgsNzMuNCw3My40LDAsMCwxLTYuNzc3LDY5LjcsNzMuNzE3LDczLjcxNywwLDAsMS0zMi4zMzgsMjYuNjNBNzMuMDQzLDczLjA0MywwLDAsMSwxODk5LjUsNjA0NVptLS4yNjEtMzguNTg3YTcuNTUyLDcuNTUyLDAsMCwxLDMuNDc3Ljg1NGwyMi42NTUsMTEuODVhNy41LDcuNSwwLDAsMCwzLjQ4Mi44NjksNy42MjMsNy42MjMsMCwwLDAsNS43NTYtMi43LDcuMjUzLDcuMjUzLDAsMCwwLDEuNi02bC00LjMyNC0yNS4wOTRhNy4zOTQsNy4zOTQsMCwwLDEsMi4xNDUtNi41NzVsMTguMzMxLTE3Ljc3NGE3LjMyMSw3LjMyMSwwLDAsMCwxLjktNy42LDcuMzcyLDcuMzcyLDAsMCwwLTYuMDM2LTUuMDc0bC0yNS4zMzMtMy42NjRhNy40NTQsNy40NTQsMCwwLDEtNS42MjQtNC4wNjNsLTExLjMyNy0yMi44MzFhNy40MjYsNy40MjYsMCwwLDAtMi44NjctMy4xMDcsNy42MTcsNy42MTcsMCwwLDAtNy42NzQsMCw3LjQyOCw3LjQyOCwwLDAsMC0yLjg2NywzLjEwN2wtMTEuMzI4LDIyLjgzMWE3LjQ1Miw3LjQ1MiwwLDAsMS01LjYyMiw0LjA2M2wtMjUuMzM0LDMuNjY0YTcuNCw3LjQsMCwwLDAtNC4xMzksMTIuNjc3bDE4LjMzLDE3Ljc3NGE3LjQsNy40LDAsMCwxLDIuMTQ3LDYuNTc1bC00LjMyNSwyNS4wOTRhNy4yNTIsNy4yNTIsMCwwLDAsMS42MDUsNiw3LjYyNCw3LjYyNCwwLDAsMCw1Ljc1NiwyLjcsNy41MDksNy41MDksMCwwLDAsMy40ODMtLjg2OWwyMi42NTUtMTEuODVBNy41NDMsNy41NDMsMCwwLDEsMTg5OS4yNCw2MDA2LjQxM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNTQ4IC0zNTg1KSIgZmlsbD0iIzM0MzQzNCIvPgogICAgICA8ZyBpZD0iaWNfbWVudV9wcm9maWxlMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzI5Ljg4MSAyMzYzLjg5MikiPgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMzY5IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAzNjkiIHdpZHRoPSIxNC44MDkiIGhlaWdodD0iMTQuODA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMy43NzIgMTUuMjk0KSIgZmlsbD0ibm9uZSIvPgogICAgICAgIDxnIGlkPSJHcm91cF8xMjMzIiBkYXRhLW5hbWU9Ikdyb3VwIDEyMzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiPgogICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNDgwMSIgZGF0YS1uYW1lPSJQYXRoIDQ4MDEiIGQ9Ik0yODYuOTgzLDEzOTQuMzQ0YTI0LjY3OSwyNC42NzksMCwwLDAsMTkuODM2LTkuOTksNi40NjksNi40NjksMCwwLDAsMS02LjAyOSwxMy45NTUsMTMuOTU1LDAsMCwwLTguMjgzLTguMTgzLDQsNCwwLDAsMC0zLjY3My4zNjUsMTUuNDA3LDE1LjQwNywwLDAsMS0xNy43NjgsMCwzLjk4NCwzLjk4NCwwLDAsMC0zLjY0NS0uMzczLDEzLjk1LDEzLjk1LDAsMCwwLTguMjgzLDguMTE1LDYuNDY3LDYuNDY3LDAsMCwwLDEuMDg2LDYuMTQ3QTI1LjMsMjUuMywwLDAsMCwyODYuOTgzLDEzOTQuMzQ0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2NS44MTggLTEzNDguOTQ3KSIgZmlsbD0iIzM0MzQzNCIvPgogICAgICAgICAgPGVsbGlwc2UgaWQ9IkVsbGlwc2VfMTA5IiBkYXRhLW5hbWU9IkVsbGlwc2UgMTA5IiBjeD0iMTAuNTkxIiBjeT0iMTAuNTkxIiByeD0iMTAuNTkxIiByeT0iMTAuNTkxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC41NzUpIiBmaWxsPSIjMzQzNDM0Ii8+CiAgICAgICAgPC9nPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9zdmc+'} />
                                    </LazyLoad>
                                    <h6>{item.castName }</h6>
                                    <h6>{
                                        item.castRole ==="Author" ? 'نویسنده' :
                                        item.castRole ==="MovieTalkers" ? "صداگذار" :
                                        item.castRole === "producer" ? 'تهیه کننده' : 'کارگردان'
                                    }</h6>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default SinglePageInfo
