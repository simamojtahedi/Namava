import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import {TiTimes} from 'react-icons/ti'
import {FiSearch} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useFilter, useFilterActions } from '../../context/FilterProvider'
import FilterBox from './FilterBox'
import axios from 'axios'

const SearchBox = () => {
    const [genre, setGenre] = useState()
    const [showFilters, setShowFilters] = useState(false)
    const filters = useFilter()

    useEffect(() => {
        axios.get('https://www.namava.ir/api/v1.0/search-dependency/category')
        .then(res => {
            setGenre(res.data.result)
            filters.filters['73'].options = res.data.result  
        })
    }, [])

    return (
        <div className='px-4 pt-3'>
            <div className='search-box'>
                <div className="form-group">
                    <Form.Control type="text" placeholder="فیلم، سریال، بازیگر و ژانر" />
                    <span><FiSearch /></span>
                </div>
                <Link to='/'> <TiTimes /> بستن </Link>
            </div>
            <div>
                <Button variant='light' className='mt-2 px-3' onClick={() => setShowFilters(!showFilters)}>فیلتر</Button>
            </div>
            {genre && showFilters && <FilterBox filters={filters} />}
        </div>
    )
}

export default SearchBox
