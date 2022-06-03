import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

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

    console.log(data)


    return (
        <div>
            {data?.loading ?
                <p>loading</p>
            :
                <p>jerrr</p>
            }
        </div>
    )
}

export default SinglePage
