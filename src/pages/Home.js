import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Slider from '../components/slider/Slider'

const Home = () => {
    return (
        <Container fluid>
            <Row>
                <Slider sliderId={1316} />
            </Row>
        </Container>
    )
}

export default Home
