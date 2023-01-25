import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import line from '../images/Vector 6.png'

const PokemonCard = ({ url }) => {
  
  const [pokemon, setPokemon] = useState({});
    
  const navigate = useNavigate();
    
  useEffect(() => {
    axios.get(url).then((res) => setPokemon(res.data));
  }, []);

      
 console.log(pokemon) 

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

  function firstLetter() {
    return pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1);
  }

  function firstLetterType1() {
    return pokemon.types?.[0].type.name.charAt(0).toUpperCase() + pokemon.types?.[0].type.name.slice(1);
    
  }

  function firstLetterType2() {
    return pokemon.types?.[1].type.name.charAt(0).toUpperCase() + pokemon.types?.[1].type.name.slice(1);
    
  }

  return (
    <li className="col">
      <div
        style={{ backgroundColor: getBackground() }}
        className="card"
        onClick={() => navigate(`/pokedex/${pokemon.id}`)} >
        <div className="container-info">
          <div className="container-image">
            <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />
          </div>   
          <div className="container-name-type">
           <h2 style={{ color: getBackground() }} >{firstLetter()}</h2>
           <h5>{firstLetterType1()}</h5>
          <img className="vector" src={line} alt="" />
          </div>
          <div className="container-info-general">
              <div className="container-info-1">
               <span>HP</span>
               <p style={{ color: getBackground() }}>{pokemon.stats?.[0].base_stat}</p>
                           
               <span>DESENSE</span>
               <p style={{ color: getBackground() }}>{pokemon.stats?.[3].base_stat}</p>
              </div>
              <div className="container-info-2">
               <span>ATACK</span>
               <p style={{ color: getBackground() }}>{pokemon.stats?.[1].base_stat}</p>
                           
               <span>SPEED</span>
               <p style={{ color: getBackground() }}>{pokemon.stats?.[4].base_stat}</p>
              </div>
            </div>
        </div>
      </div>
    </li>
  );
};

export default PokemonCard;
