import { Routes, Route } from "react-router-dom";
import Pokedesk from "../Pokedesk/Pokedesk";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

function CustomRoutes(params) {
    return (
        //internally take set of routes compnents 
        <Routes>
            <Route path="/" element={<Pokedesk/>}/>
            <Route path="/pokemon/:id" element={<PokemonDetails/>} />
        </Routes>
    );
}

export default CustomRoutes;