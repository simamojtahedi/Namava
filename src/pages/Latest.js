import axios from 'axios'
import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import MoviesList from '../components/list/MoviesList'
import Slider from '../components/slider/Slider'
import { useMenues, useMenuesActions } from '../context/MenuesProvider'

const Latest = () => {
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
        <Container fluid>
            <Row>
                {menues.loading === false && menues.data.length > 0 && 
                    menues.home.pageItems.map(item => {
                        let section = undefined;

                        switch(item.payloadType) {
                            case "Slider": 
                                section = <Slider key={`page-section-${item.pageItemId}`} sliderId={item.payloadKey} />
                                break;
                            case "Latest":
                            case "LatestEpisods":
                                section = <MoviesList key={`page-section-${item.pageItemId}`} data={item} />
                            break;
                        }
                        return section
                    })
                }
                <MoviesList />
            </Row>
        </Container>
    )
}

export default Latest
