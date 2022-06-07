import React, { createContext, useContext, useReducer } from 'react'
import { useMenues } from './MenuesProvider'

const FilterContext = createContext()
const FilterContextDispatcher = createContext()

const initialState = {
    loading: false,
    errors: [],
    filters: {
        filtersId: []
    },
    genre: '',
    done: false,
    active: false
}

const filterReducer = (state, action) => {
    switch(action.type) {
        case 'SET_LOADING' : {
            state = {...state, loading: true}
            break;
        }
        default: 
        throw Error('Unknown Action')
    }
    return state
}

const FilterProvider = ({children}) => {
    const menues = useMenues()

    const [filter, dispatch] = useReducer(filterReducer, initialState, (init) => {
        let FilterMenu = menues.data.find(menuItem => menuItem.slug === "FilterMenu")
        let filters = {
            filtersId: []
        }
        let genre = null
        let done = true

        if (FilterMenu) {
            let filtersMenu = menues.data.filter(menuItem => menuItem.parentId === FilterMenu.menuId)
            filtersMenu.forEach(filterMenu => {
                filters.filtersId.push(filterMenu.menuId)
                filters[filterMenu['menuId']] = {
                    filterId: filterMenu.menuId,
                    slug: filterMenu.slug,
                    options: [],
                    caption: filterMenu.caption,
                    selected: []
                }
                if(filterMenu.slug === "genre") {
                    genre = filterMenu.menuId
                }
            })
            menues.data.forEach(menuItem => {
                let filterId = filters.filtersId.find(fId => fId == menuItem.parentId)
                if(filterId) {
                    filters[filterId].options.push({
                        optionId: menuItem.menuId,
                        slug: menuItem.slug,
                        caption: menuItem.caption,
                        selected: false,
                        entityType: menuItem.entityType,
                    })
                }
            })
        }

        if (genre) {
            done = false
        }
        return {
            ...init,
            filters,
            done,
            genre
        }
    })

    return (
        <FilterContext.Provider value={filter}>
            <FilterContextDispatcher.Provider value={dispatch}>
                {children}
            </FilterContextDispatcher.Provider>
        </FilterContext.Provider>
    )
}

export default FilterProvider

export const useFilter = () => useContext(FilterContext)
export const useFilterActions = () => useContext(FilterContextDispatcher)


