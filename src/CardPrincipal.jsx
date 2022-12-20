import { FaPlay } from "react-icons/fa";
//Importación de los estilos CSS 
import './cardPrincipal.css'
//Importación de funciones
import { deleteDec, colorDec } from './App'
//Importación de componentes
import Graph from "./Graph";

//Función que se encarga de retornarnos los valores del JSON
function CardPrincipal({ json: { id,
    symbol,
    current_price,
    image,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_30d_in_currency,
    price_change_percentage_1y_in_currency
}, cur = "usd" }) {

   
    return (
        <>
            <article className="cripto-first">
                {/* Titulo de la grafica */}
                <div className="cripto-title">
                    <img src={image} alt="Icono de cripto" />
                    <h2>{symbol} - {current_price} {cur}</h2>
                    {/* <select name="select-percentage" id="select-percentage">
                        <option value="value1" selected>12%</option>
                        <option value="value2">18%</option>
                        <option value="value3">20%</option>
                    </select> */}
                    <h2><FaPlay className={`icon-arrow ${colorDec(price_change_percentage_30d_in_currency)}`}/>{deleteDec(price_change_percentage_30d_in_currency,2)}%</h2>
                </div>
                {/* Desarrollo de la grafica */}
                <div className="graphic">
                    <Graph type={0} coin={id} currency={cur}/>
                </div>
                {/* Porcentaje de capitalziación */}
                <div className="capitalization">
                    <h2>Capitalización</h2>
                    <table className="capitalization-table">
                        <thead>
                            <tr>
                                {/* Lista de dias de capitalización */}
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>1m</th>
                                <th>1y</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* Listacod, asigna color al porcentaje de capitalización y borra decimales y añade el simbolo % */}
                                <td className={colorDec(price_change_percentage_1h_in_currency)}>{deleteDec(price_change_percentage_1h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_24h_in_currency)}>{deleteDec(price_change_percentage_24h_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_7d_in_currency)}>{deleteDec(price_change_percentage_7d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_30d_in_currency)}>{deleteDec(price_change_percentage_30d_in_currency, 2)}%</td>
                                <td className={colorDec(price_change_percentage_1y_in_currency)}>{deleteDec(price_change_percentage_1y_in_currency, 2)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </>
    );
}
// Exportación del componente
export default CardPrincipal;