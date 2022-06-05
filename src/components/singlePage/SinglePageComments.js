import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { imageUrl } from '../../utils/functions'
import './singlePage.scss'
import moment from "moment-jalaali";
import fa from "moment/locale/fa";
import 'moment-timezone'
import {BsHandThumbsUp, BsHandThumbsDown} from 'react-icons/bs'


const SinglePageComments = ({comments, getComments}) => {
    moment.locale("fa", fa)
    function time (date) {
        moment.loadPersian({usePersianDigits: true})
        let createdDateUTC = new moment(date.substr(0, 15)).tz("Asia/Tehran").locale('fa').format("dddd jD jMMMM [ساعت] H")
        return createdDateUTC;
    }

    return (
        <Container>
            <div className='single-page-comments mt-5 px-5'>
                <h5>نظرات کاربران</h5>
                <div className='comments'>
                {comments?.length > 0 && 
                    comments.map(comment => (
                        <div className='comment'>
                            <img src={imageUrl(comment.profileAvatar)} />
                            <div>
                                <h6>{comment.profileCaption} - {time(comment.createDateUTC)}</h6>
                                <p>{comment.body}</p>
                                <div className='likes'>
                                    <span><BsHandThumbsUp /> {comment?.commentLikeDislike.likeCount}</span>
                                    <span><BsHandThumbsDown /> {comment?.commentLikeDislike.dislikeCount}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <Button variant="outline-light" onClick={() => getComments(2)} className='mt-5 col-lg-2 offset-lg-5'>بیشتر</Button>
                </div>
            </div>
        </Container>
    )
}

export default SinglePageComments
