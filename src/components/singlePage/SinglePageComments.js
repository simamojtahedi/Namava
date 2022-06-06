import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { imageUrl } from '../../utils/functions'
import './singlePage.scss'
import moment from "moment-jalaali";
import fa from "moment/locale/fa";
import 'moment-timezone'
import {BsHandThumbsUp, BsHandThumbsDown} from 'react-icons/bs'


const SinglePageComments = ({id}) => {
    const [commentsData, setCommentsData] = useState({
        comments: [],
        pi: 1,
        showMore: false
    })

    moment.locale("fa", fa)
    function time (date) {
        moment.loadPersian({usePersianDigits: true})
        let createdDateUTC = new moment(date.substr(0, 15)).tz("Asia/Tehran").locale('fa').format("dddd jD jMMMM [ساعت] H")
        return createdDateUTC;
    }

    useEffect(() => {
        getComments(1)
    }, [id])

    const getComments = (pi) => {
        axios.get(`https://www.namava.ir/api/v1.0/comments?pi=${pi}&ps=10&mediaId=${id.split('-')[0]}&profileId=0`)
        .then ( response => {
            setCommentsData({
                ...commentsData,
                comments: [...commentsData.comments, ...response.data.result],
                pi: commentsData.pi + 1,
                showMore: response.data.result < 10 ? false : true
            })
        })
        .catch(err => console.log(err))
    }

    return (
        <Container>
            <div className='single-page-comments mt-5 px-5'>
                <h5>نظرات کاربران</h5>
                <div className='comments'>
                {commentsData.comments?.length > 0 && 
                    commentsData.comments.map(comment => (
                        <div className='comment'>
                            <img src={imageUrl(comment?.profileAvatar)} />
                            <div>
                                <h6>{comment?.profileCaption} - {time(comment?.createDateUTC)}</h6>
                                <p>{comment?.body}</p>
                                <div className='likes'>
                                    <span><BsHandThumbsUp /> {comment?.commentLikeDislike.likeCount}</span>
                                    <span><BsHandThumbsDown /> {comment?.commentLikeDislike.dislikeCount}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {commentsData.showMore ?
                    <Button variant="outline-light" onClick={() => getComments(commentsData.pi + 1)} className='mt-5 col-lg-2 offset-lg-5'>بیشتر</Button>
                :
                    ''
                }
                </div>
            </div>
        </Container>
    )
}

export default SinglePageComments
