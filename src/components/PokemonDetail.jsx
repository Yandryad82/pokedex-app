import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/styles.css'
import line from '../images/Vector 6.png'

const PokemonDetail = () => {

  const {id} = useParams();

  const [pokemon, setPokemon] = useState({});

  const [movements, setMovements] = useState([]);

  const [abilities, setAbilities] = useState([]);

  const navigate = useNavigate();

  const [pageMove, setPageMove] = useState(1);
  const pokemonsPerPageMove = 9;
  const lastIndex = pageMove * pokemonsPerPageMove;
  const firstIndex = lastIndex - pokemonsPerPageMove;
  const pokemonsMovesPaginated = movements.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(movements.length/pokemonsPerPageMove);
  const pagesMove = [];

  for(let i = 1; i <= totalPage; i++){
    pagesMove.push(i);
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data))
      .catch(() => navigate('/pokedex/notFound'))
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setMovements(res.data.moves))
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setAbilities(res.data.abilities))
  }, []);

  console.log(abilities)

  function firstLetter() {
    return pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1);
  }

  const getBackground = () => {
    let type = pokemon.types?.[0].type.name;
    switch (type) {
      case "normal":
        return "#B19176";
        break;
      case "fighting":
        return "#C03636";
        break;
      case "flying":
        return "#568AA8";
        break;
      case "poison":
        return "#964BC2";
        break;
      case "ground":
        return "#722F03";
        break;
      case "rock":
        return "#81404B";
        break;
      case "bug":
        return "#0FCCB3";
        break;
      case "ghost":
        return "#CD40F8";
        break;
      case "steel":
        return "#D6D3D3";
        break;
      case "fire":
        return "#C51821";
        break;
      case "water":
        return "#2697F3";
        break;
      case "grass":
        return "greenyellow";
        break;
      case "electric":
        return "#CAAF36";
        break;
      case "psychic":
        return "#FA7E93";
        break;
      case "ice":
        return "#B9E3F3";
        break;
      case "dragon":
        return "#FA4801";
        break;
      case "dark":
        return "gray";
        break;
      case "fairy":
        return "pink";
        break;
    }
  };
  
    return (
        <div>
          <div className='container-general-details' style={{ backgroundColor: getBackground() }}>
            <div className='container-card-details'>
              <div className='container-weight'>
                <p>{pokemon.weight}</p>
                <span>Weight</span>
                <br />
                <br />
                <img src={line} alt="" />
                <br />
                <span className='span-abilitie'>Abilities</span>
                <div className='container-abilites'>
                {abilities.map(abilitie => (
                  <li className='abilities-list'>{abilitie.ability.name}</li>
                ))}
                </div>
              </div>
              <div className='container-name-details'>
                  <h1 style={{ color: getBackground() }}>{firstLetter()}</h1>
                  <b><p>#: {id}</p></b>
                <div className='container-image-details'>
                  <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />
                </div>
              </div>
              <div className='container-height'>
                <p>{pokemon.height}</p>
                <span>Height</span>
                <br />
                <br />  
                <img src={line} alt="" />
                <br />
                <span className='span-type'>Type</span>
                <div className='types'>
                  <p>{pokemon.types?.[0].type.name}</p>
                </div>
              </div>
            </div>
            <div className='container-moviments-general'>
              <div className='container-name-move'>

              </div>
              <div className='container-move'>
                <h3>Movements</h3>
                <>
                  {pokemonsMovesPaginated.map(move => (
                    <li className='container-move-list' style={{ color: getBackground() }}>
                      
                      {move.move.name}
                      
                    </li>
                  ))}
                </>
              </div>
              <div className="container-boton-move-list">
               <button className='button-prev-movements' onClick={() => setPageMove(pageMove-1)} disabled={pageMove === 1}>Prev Page</button>
                 <span>{pageMove} / {totalPage}</span>
               <button className='button-next-movements' onClick={() => setPageMove(pageMove+1)} disabled={pageMove === totalPage}>Next Page</button> 
              </div>
              
             </div>
             
            <Link to='/pokedex' >Back</Link>
          </div>
        </div>
    );
};

export default PokemonDetail;