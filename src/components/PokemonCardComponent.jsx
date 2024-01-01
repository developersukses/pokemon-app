import React from 'react';
import PokemonRequest from '../util/PokemonRequest';
import LoadingComponent from './LoadingComponent';

const PokemonCardComponent = ({pokemon,handleClick, style}) => {
    const { name } = pokemon
    const { data, error } = PokemonRequest('/pokemon',name)

    if (error) return <h1>Something went wrong</h1>;
    if (!data) return <LoadingComponent/>;

    return (
        <div className='pokemon-card effect-card rounded-3' style={style} onClick={handleClick}>
            <div className='image-card'>
                <img
                    className='rounded-top-3'
                    src={data.sprites.other.home.front_shiny}
                    alt={name}
                />
            </div>
            <div className='body-card'>
                <h4>{name}</h4>
            </div>
            <div className='footer-card'>
                <span>More Details &nbsp; &rarr;</span>
            </div>
        </div>
    );
};

export default PokemonCardComponent;
