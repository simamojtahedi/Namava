import React, { createContext, useContext, useReducer } from 'react'

const SliderContext = createContext()
const SliderContextDispatcher = createContext()

const initialState = {
    loading: false,
    errors: [],
    id: '',
    items: [],
    currentSlide: 0,
    previousSlide: null
}

const sliderReducer = (state, action) => {
    switch(action.type) {
        case 'SET_LOADING' : {
            state = {...state, loading: true}
            break;
        }
        case 'SET_ITEMS' : {
            state = {...state, loading: false, id: action.id, items: action.items}
            break;
        }
        case 'SET_ERRORS' : {
            state = {...state, loading: false, errors:action.errors}
            break;
        }
        case 'SET_SLIDE' : {
            state = {...state, currentSlide: action.currentSlide, previousSlide: action.previousSlide}
            break;
        }
        default: 
        throw Error('Unknown Action')
    }
    return state
}

const SliderProvider = ({children}) => {
    const [slider, dispatch] = useReducer(sliderReducer, initialState)

    return (
        <SliderContext.Provider value={slider}>
            <SliderContextDispatcher.Provider value={dispatch}>
                {children}
            </SliderContextDispatcher.Provider>
        </SliderContext.Provider>
    )
}

export default SliderProvider

export const useSlider = () => useContext(SliderContext)
export const useSliderActions = () => useContext(SliderContextDispatcher)


