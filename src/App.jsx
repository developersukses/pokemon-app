import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import PokemonList from './pages/PokemonList';
import MyPokemon from './pages/MyPokemon';
import PokemonDetail from './pages/PokemonDetail';

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
          <Route path='/' element={<PokemonList />} />
          <Route path='/mypokemon' element={<MyPokemon />} />
          <Route path='/pokemondetail/:name' element={<PokemonDetail />} />
      </Routes>
    </>
  );
}

export default App;
