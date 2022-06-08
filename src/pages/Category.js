import axios from 'axios'
import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import MoviesList from '../components/list/MoviesList'
import { useMenues, useMenuesActions } from '../context/MenuesProvider'
import { imageUrl } from '../utils/functions'
import './MenuPage.scss'

const Category = () => {
    const menues = useMenues()
    const dispatch = useMenuesActions()

    const fetchMenues = (dispatch) => {
        dispatch({type: "SET_LOADING"})
        axios.get(`https://www.namava.ir/api/v3.0/menus`)
        .then(response => {
            let homePageIndex = response.data.result.findIndex(item => item.slug === "index")
            let home = {}
            if (homePageIndex > -1){
                home = response.data.result[homePageIndex]
            }
            dispatch({
                type: "SET_DATA",
                home: home,
                data: response.data.result,
            })
        })
    }

    useEffect(() => {
        fetchMenues(dispatch)
    }, [dispatch])

    return (
        <div className='page-container'>
           <Container fluid>
            <Row>
                {menues.loading === false && menues.data.length > 0 && 
                    menues.data.filter(item => item.entityType = "CategoryGroup" && item.parentId === 5).map(item => (
                        <div className='col-lg-3' key={item.menuId}>
                            <img src={imageUrl(item.imageUrl)} />
                            <h6>{item.caption}</h6>
                        </div>
                    ))
                }
            </Row>
        </Container> 
        </div>
    )
}

export default Category
