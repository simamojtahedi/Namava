import React from 'react'
import SliderProvider from './SliderProvider'

const Providers = ({children}) => {
    return (
        <SliderProvider>
            {children}
        </SliderProvider>
    )
}

export default Providers
