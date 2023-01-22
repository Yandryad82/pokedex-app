import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import '../src/css/styles.css'
import InputName from './components/InputName'
import Pokedex from './components/Pokedex'
import PokemonDetail from './components/PokemonDetail'
function App() {
  
  return (
    <div className="App">
      <div className='navbar-container'>
        <nav className='navbar'>

        </nav>
        <HashRouter>
          <Routes>
            <Route path="/" element={<InputName />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  )
}

export default App
