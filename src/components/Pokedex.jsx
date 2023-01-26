import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";

const Pokedex = () => {
  const userName = useSelector((state) => state.userName);

  const [pokemons, setPokemons] = useState([]);

  const [inputSearch, setInputSearch] = useState("");

  const [pokemonTypes, setPokemonTypes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279")
      .then((res) => setPokemons(res.data.results));

    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((res) => setPokemonTypes(res.data.results));
  }, []);

  const [page, setPage] = useState(1);
  const pokemonsPerPage = 50;
  const lastIndex = page * pokemonsPerPage;
  const firstIndex = lastIndex - pokemonsPerPage;
  const pokemonsPaginated = pokemons.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(pokemons.length / pokemonsPerPage);
  const pages = [];

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  const search = () => {
    navigate(`/pokedex/${inputSearch.toLowerCase()}`);
  };

  const filterType = (e) => {
    axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
  };

  function firstLetter() {
    return userName.charAt(0).toUpperCase() + userName.slice(1);
  }

  function toToppPage() {
    window.scrollTo(0, 0);
    setPage(page - 1);
  }

  function toToppnPage() {
    window.scrollTo(0, 0);
    setPage(page + 1);
  }

  function toToppBPage(number) {
    window.scrollTo(0, 0);
    setPage(number);
  }

  return (
    <div className="general-container">
      <p className="container-saludo">
        <span className="saludo">Welcome {firstLetter()}:</span>{" "}
        <span>Aquí podrás encontrar tu pokemón favorito</span>
      </p>
      <div className="container-search">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
        <button onClick={search}>Search</button>

        <select onChange={filterType} name="" id="">
          {pokemonTypes.map((type) => (
            <option value={type.url} key={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="characters-list">
        {pokemonsPaginated.map((pokemon) => (
          <PokemonCard
            url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
          />
        ))}
      </div>
      <div className="container-page">
        <div className="container-boton-next-prev">
          <button onClick={() => toToppPage()} disabled={page === 1}>
            Prev Page
          </button>
          <span>
            {page} / {totalPage}
          </span>
          <button onClick={() => toToppnPage()} disabled={page === totalPage}>
            Next Page
          </button>
        </div>
        <div className="boton-paginated">
          {pages.map((number) => (
            <button onClick={() => toToppBPage(number)}>{number}</button>
          ))}
        </div>
      </div>
      <div className="button-back">
        <Link to="/">Back</Link>
      </div>
    </div>
  );
};

export default Pokedex;
