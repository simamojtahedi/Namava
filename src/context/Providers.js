import React from 'react'
import MenuesProvider from './MenuesProvider'
import SliderProvider from './SliderProvider'

const Providers = ({children}) => {
    return (
        <MenuesProvider>
            <SliderProvider>
                {children}
            </SliderProvider>
        </MenuesProvider>
    )
}

export default Providers
