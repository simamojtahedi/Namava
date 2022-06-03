import { useRef } from 'react'
import MovieDetails from './MovieDetails'
import './preview.scss'

const Preview = ({id, isActive}) => {
    const previewItem = useRef()

    return (
        <div ref={previewItem}  >
            <MovieDetails isActive={isActive} id={id} />
        </div>
    )
}

export default Preview
