import React, { useState } from 'react'
import { Col, Form, Nav, Row, Tab } from 'react-bootstrap'

const FilterBox = ({filters}) => {
    return (
        <div className='ml-4 ms-2 filters-box-contianer'>
            <Tab.Container id="tab" defaultActiveKey="genre">
                <Row>
                    <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        {filters.filters['filtersId'].map(filterId => (
                            <Nav.Item key={filters.filters[filterId]}>
                                <Nav.Link eventKey={filters.filters[filterId].slug}>{filters.filters[filterId].caption}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                    </Col>
                    <Col sm={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="genre">
                            <Row>
                            {filters.filters['73'].options.map(item => (
                                <div className='col-lg-2'>
                                    <Form.Group className="mb-3" controlId={item}>
                                        <Form.Check type="checkbox" label={item} />
                                    </Form.Group>
                            </div>))}
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="country">
                            <Row>
                            {filters.filters['52'].options.map(item => (
                                <div className='col-lg-2'>
                                    <Form.Group className="mb-3" controlId={item.optionId}>
                                        <Form.Check type="checkbox" label={item.caption} />
                                    </Form.Group>
                            </div>))}
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="cognition">
                            <Row>
                            {filters.filters['40'].options.map(item => (
                                <div className='col-lg-2'>
                                    <Form.Group className="mb-3" controlId={item.optionId}>
                                        <Form.Check type="checkbox" label={item.caption} />
                                    </Form.Group>
                            </div>))}
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="sort">
                            <Row>
                            {filters.filters['64'].options.map(item => (
                                <div className='col-lg-2'>
                                    <Form.Group className="mb-3" controlId={item.optionId}>
                                        <Form.Check type="radio" name='sort' label={item.caption} />
                                    </Form.Group>
                            </div>))}
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default FilterBox
