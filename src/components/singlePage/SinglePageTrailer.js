import React from 'react'
import { imageUrl } from '../../utils/functions'
import './singlePage.scss'

const SinglePageTrailer = ({data}) => {
    return (
        <div className='single-page-trailers mt-5'>
            <h5 className='mb-4'>تصاویر و جزئیات</h5>
            <div>
                {data?.slideImageList.length > 0 &&
                    data.slideImageList.map(item => (
                        <img src={`${imageUrl(item.url)}?anchor=middlecenter&crop=auto&scale=both&w=200&h=150`} />
                    ))
                }
            </div>
        </div>
    )
}

export default SinglePageTrailer
