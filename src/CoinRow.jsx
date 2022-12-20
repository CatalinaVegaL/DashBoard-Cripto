import React from "react";
//Importación de los estilos CSS 
import "./coinRow.css"
//Importación de componentes
import Graph from './Graph'
//Importación de funciones
import {deleteDec, colorDec, numberF} from './App'
// Exportación del componente, función CoinRow asigna la imagen correspondiente a la criptomoneda
export default function CoinRow({ coin, index }) {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="coin_image_container">
            <img src={coin.image} title={coin.name} alt={coin.name} />
        </div>
      </td>
      {/* Precio de la cripto en US, valor extraido del JSON*/}
      <td>{numberF.format(coin.current_price)}US$</td>
      {/* Variación del precio de la cripto en %, elimina decimales y aporta color dependiendo del valor, valor extraido del JSON */}
      <td className={colorDec(coin.market_cap_change_percentage_24h)}>{deleteDec(coin.market_cap_change_percentage_24h, 2)}%</td>
      {/* valor total extraido del JSON */}
      <td>{numberF.format(coin.total_volume)}US$</td>
      {/* capital de mercado extraido del JSON */}
      <td>{numberF.format(coin.market_cap)}US$</td>
      {/* Grafica de variación de la cripto */}
      <td><Graph coin={coin.id} days={7} color={colorDec(coin.market_cap_change_percentage_24h)}/></td>
    </tr>
  );
}
