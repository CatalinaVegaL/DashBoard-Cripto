//Importación de react
import React from 'react';
//Importación de los estilos CSS 
import './Header.css';
//Importación de funciones
import { useTheme } from './Context/ThemeProvider';

export default function Header({currencys, fun, cur}){
  const {theme, toggleTheme} = useTheme();
  
  return (
    <header className='app-header'>
      <p>Crypto Stadistics</p>
      <div className='select-button'>
      <select value={cur} name="coinSelect" id="coinSelect" onChange={_ => {fun(document.getElementById("coinSelect").value)}}>
        {currencys.map((item, index) => <option value={item} key={index} >{item}</option>)}  
      </select>
      </div>
    </header>
  )
}