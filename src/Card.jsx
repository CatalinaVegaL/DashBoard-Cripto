//Importación de los estilos CSS 
import "./Card.css"
//Importación de componentes
import Graph from "./Graph"
//Importación de función global
import {colorDec} from './App'
//Exportación de función card con props como parametros
export default function Card({coinId, cur, porcentaje, price, img}){
    return (
        <div className="card">
            <img src={img} alt=""/>
            <div className="con-main">
                <div className="con-title">
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price}</h2>
                    <h4 className={`porcentajes ${colorDec(porcentaje)}`}>{porcentaje}%</h4>
                </div>
                <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)}/>
            </div>
        </div>
    )
}