import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Pokedesk.css';

function Pokedesk(params) {
    return (
        <div className="Pokedesk-wrapper">
            <h1 className="Pokedesk-heading">Pokedesk:</h1> 
             <Search/>
             <PokemonList/>
        </div>
    )
}

export default Pokedesk;