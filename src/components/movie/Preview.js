import MovieDetails from './MovieDetails'
import './preview.scss'

const Preview = ({id, isActive}) => {
    
    return (
        <div>
            <MovieDetails isActive={isActive} id={id} />
        </div>
    )
}

export default Preview
