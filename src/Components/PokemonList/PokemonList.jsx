import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
    
    const [PokemonList, setPokemonList] = useState([]);
    const [isloadding, setLoadding] = useState(true);

    const [PokedeskUrl,setPokedeskUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nexturl, setNexturl] = useState('');
    const [prevurl, setPrevurl] = useState('')


    async function downloadPokemons() {
        setLoadding(true);
        const response = await axios.get(PokedeskUrl); // download first 20 pokemons // full details about pokemon
        // console.log("response", response); // a full object like... config,data,headers,request
        
        const pokemonlistresults = response.data.results; // get the array of only pokemons details
        // console.log("pokemonlistresults", pokemonlistresults ); // whatever the actual data is in the result-object
        
        console.log(response.data);
        setNexturl(response.data.next);
        setPrevurl(response.data.previous);
    
        //iterating over the array of pokemons,and using their urls , to create an array of promises
        //that will download those 20pokemons
        const pokemonResultPromise = pokemonlistresults.map((pokemon) => axios.get(pokemon.url));
        // console.log(pokemonResultPromise);
        
        //passing that promise array to axios.all
        //array of 20 pokemon detailed data
        const pokemonData = await axios.all(pokemonResultPromise);
        // console.log(pokemonData);   //pokemon details 
        
        //now iterate on the data of each pokemon and exract id,name,image, types
        const res = pokemonData.map((pokeData) => {
           const pokemon = pokeData.data;
        //    console.log(pokemon);

           //after what u want to get from the pokemon individual item
           return {id:pokemon.id,
                name:pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny , 
                types:pokemon.types
            }
        });
        console.log(res);
        setPokemonList(res);
        setLoadding(false);

    }
    
    //take two argument : (callback) and dependancy array(needed)- not render on the mulitple time of the page loading
    //useeffect : when u wanted to load something on the first time render
    useEffect(() => {
        downloadPokemons();
    }, [PokedeskUrl]); // if u want to track the state of the x then use x in array  and again render for the next part

   
    
    return (
        <div className="Pokemon-list-wrapper">
            {/* <div className="poke_list_heading">pokemon list</div> */}
            <div className="Pokemon-wrapper">
                {(isloadding) ? 'Loading': PokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>) }
            </div>
            <div className="Controls">
                <button disabled={prevurl == null} onClick={()=> setPokedeskUrl(prevurl)}>Prev</button>
                <button disabled={nexturl == null} onClick={() => setPokedeskUrl(nexturl)}>Next</button>
            </div>
            
        </div>
    )
}

export default PokemonList