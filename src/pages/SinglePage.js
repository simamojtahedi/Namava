import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SinglePageComments from '../components/singlePage/SinglePageComments'
import SinglePageHeader from '../components/singlePage/SinglePageHeader'
import SinglePageInfo from '../components/singlePage/SinglePageInfo'
import SinglePageTrailer from '../components/singlePage/SinglePageTrailer'

const SinglePage = () => {
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
                            <SinglePageComments id={id.split('-')[0]}  />
                        </>  
                    }
                </>
            }
        </div>
    )
}

export default SinglePage
