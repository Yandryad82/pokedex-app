import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeUserName } from '../store/slices/userName.slice';
import pokeSaludo from '../images/pokemon.gif'
import pokeBag from '../images/cover-pokemon-preview.png'
import bola from '../images/bola.png'

const InputName = () => {

	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState('');
	const navigate = useNavigate();

	const clickButton = () => {
		dispatch(changeUserName(inputValue));
		navigate("/pokedex");
	}

	return (
		<div className='container-input-general'>
			<div className='container-input-name'>
			  <img src={pokeSaludo} alt="" />
			  <h2>Hello Trainer</h2>
			  <p>Give me your name to start</p>
			  <input type="text" 
			  value={inputValue}
			  onChange={(e) => setInputValue(e.target.value)} />
			  <button onClick={clickButton} type='button' >Submit</button>
			 </div>
		</div>
	);
};

export default InputName;