import React, { createContext, useContext, useReducer } from 'react'

const MenuesContext = createContext()
const MenuesContextDispatcher = createContext()

const initialState = {
    loading: false,
    errors: [],
    id: '',
    data: [],
    home: null
}

const menuesReducer = (state, action) => {
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

const MenuesProvider = ({children}) => {
    const [menues, dispatch] = useReducer(menuesReducer, initialState)

    return (
        <MenuesContext.Provider value={menues}>
            <MenuesContextDispatcher.Provider value={dispatch}>
                {children}
            </MenuesContextDispatcher.Provider>
        </MenuesContext.Provider>
    )
}

export default MenuesProvider

export const useMenues = () => useContext(MenuesContext)
export const useMenuesActions = () => useContext(MenuesContextDispatcher)


