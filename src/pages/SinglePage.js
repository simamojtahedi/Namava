import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SinglePageComments from '../components/singlePage/SinglePageComments'
import SinglePageHeader from '../components/singlePage/SinglePageHeader'
import SinglePageInfo from '../components/singlePage/SinglePageInfo'
import SinglePageTrailer from '../components/singlePage/SinglePageTrailer'

const SinglePage = () => {
    const [comments, setComments] = useState([])
    const [data, setData] = useState({
        loading: false,
        data: {},
        error: ''
    })
    let {type, id} = useParams()
    
    useEffect(() => {
        setData({...data, loading: true})
        axios.get(`https://www.namava.ir/api/v2.0/medias/${id.split('-')[0]}/single-${type}`)
        .then ( response => {
            setData({...data, loading: false, data: response.data})
        })
        .catch(err => setData({...data, loading: false, error: err}))
    }, [id])
    
    useEffect(() => {
        setData({...data, loading: true})
        getComments(1)
    }, [id])

    const getComments = (pi) => {
        axios.get(`https://www.namava.ir/api/v1.0/comments?pi=${pi}&ps=10&mediaId=${id.split('-')[0]}&profileId=0`)
        .then ( response => {
            setComments(response.data.result)
        })
        .catch(err => console.log(err))
    }

    console.log(comments)

    return (
        <div>
            {data?.loading ?
                <p>loading</p>
            :
                <>
                    {data.data && 
                        <>
                            <SinglePageHeader data={data.data.result} />
                            <SinglePageTrailer data={data.data.result} />  
                            <SinglePageInfo data={data.data.result} />
                            {comments && <SinglePageComments comments={comments} getComments={getComments} />}
                        </>  
                    }
                </>
            }
        </div>
    )
}

export default SinglePage
