import React, { createContext, useContext, useReducer } from 'react'

const BriefDataContext = createContext()
const BriefDataContextDispatcher = createContext()

const initialState = {
    loading: false,
    errors: [],
    id: '',
    data: [],
}

const dataReducer = (state, action) => {
    switch(action.type) {
        case 'SET_LOADING' : {
            state = {...state, loading: true }
            break;
        }
        case 'SET_DATA' : {
            state = {...state, loading: false, data: action.data, home: action.home}
            break;
        }
        case 'SET_ERRORS' : {
            state = {...state, loading: false, errors:action.errors}
            break;
        }
        default: 
        throw Error('Unknown Action')
    }
    return state
}

const BriefDataProvider = ({children}) => {
    const [briefData, dispatch] = useReducer(dataReducer, initialState)

    return (
        <BriefDataContext.Provider value={briefData}>
            <BriefDataContextDispatcher.Provider value={dispatch}>
                {children}
            </BriefDataContextDispatcher.Provider>
        </BriefDataContext.Provider>
    )
}

export default BriefDataProvider

export const useBriefData = () => useContext(BriefDataContext)
export const useBriefDataActions = () => useContext(BriefDataContextDispatcher)


