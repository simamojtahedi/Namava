import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { imageUrl } from '../../utils/functions'
import {AiFillHeart} from 'react-icons/ai'
import {BsDownload, BsHandThumbsUp, BsHandThumbsDown} from 'react-icons/bs'

const SingglePageSeasons = ({seasonId}) => {

    console.log(seasonId)
    const [episods, setEpisods] = useState([])

    useEffect(() => {
        axios.get(`https://www.namava.ir/api/v2.0/medias/seasons/${seasonId}/episodes`)
        .then(response => {
            setEpisods(response.data.result)
        })
        .catch(err => console.log(err))
    }, [seasonId])

    console.log(episods)

    return (
        <Container fluid>
            <Row className='px-3 mt-4 flex-row-reverse'>
                {episods?.length > 0 ?
                    episods.map(episode => (
                        <div className='episode-container col-lg-3'>
                            <div className='ep-image'>
                                <img src={`${imageUrl(episode.imageUrl)}?anchor=middlecenter&crop=auto&scale=both&w=300&h=195`} />
                                <span>{episode.mediaDuration} دقیقه</span>
                                {episode.newEpisode ? <span className='ep-new'> جدید </span> : ''}
                            </div>
                            <h6>{episode.caption}</h6>
                            <div className='ep-header'>
                                <span><AiFillHeart /> {episode.hit}% </span>
                                <div>
                                    <Button><BsHandThumbsUp /></Button>
                                    <Button><BsHandThumbsDown /></Button>
                                    <Button><BsDownload /></Button>
                                </div>
                            </div>
                            <p>{episode.shortDescription}</p>
                        </div>
                    ))
                :
                    ''
                }
            </Row>
        </Container>
    )
}

export default SingglePageSeasons
