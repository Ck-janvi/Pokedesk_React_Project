import './Pokemon.css';

function Pokemon({name, image}) {
    return(
        <div className='Pokemon'>
            <div className='Pokemon-name'>{name}</div>
            <div className="Pokemon-image"><img src={image}/></div>
        </div>
    )
}

export default Pokemon