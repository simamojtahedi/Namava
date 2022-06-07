import React from 'react'
import { Container } from 'react-bootstrap'
import SearchBox from '../components/search/SearchBox'
import FilterProvider from '../context/FilterProvider'
import { useMenues } from '../context/MenuesProvider'
import './search.scss'

const Search = () => {
    const menues = useMenues()

    return (
        <Container fluid className='search-container'>
            <div className='col-lg-12'>
                {menues.data ? 
                    <FilterProvider>
                        <SearchBox />
                    </FilterProvider>
                :
                    ''
                }
            </div>
        </Container>
    )
}

export default Search
