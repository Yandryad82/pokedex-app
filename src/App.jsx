import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import '../src/css/styles.css'
import InputName from './components/InputName'
import Pokedex from './components/Pokedex'
import PokemonDetail from './components/PokemonDetail'
import PokeNotFound from './components/PokeNotFound'
import ProtectedRoutes from './components/ProtectedRoutes'
import image from '../src/images/image 12.png'
function App() {
  
  return (
    <div className="App">
      <div className='navbar-container'>
        <nav className='navbar'>
          <img src={image} alt="" />
          <div className='sub-bar'></div>
        </nav>
        <HashRouter>
          <Routes>
            <Route path="/" element={<InputName />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/pokedex" element={<Pokedex />} />
              <Route path="/pokedex/:id" element={<PokemonDetail />} />
              <Route path='/pokedex/notFound' element={<PokeNotFound />}/>
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </div>
  )
}

export default App
