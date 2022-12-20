//Importación de los hooks desde react
import { useEffect, useState } from "react";
//Importacion de axios desde la libreria axios
import axios from "axios";
//Importación de componentes
import InputConvert from "./InputConvert"; 
import { FaExchangeAlt } from "react-icons/fa"; 
//Importación de los estilos CSS 
import "./Convert.css"; 


export default function Convert() {
  const [coin, setCoin] = useState([])
  const [selCoin1, setSelCoin1] = useState("btc")
  const [selCoin2, setSelCoin2] = useState("eth")
  const [mainTxt, setMainTxt] = useState(0)
  const [res, setRes] = useState(0)

  // Función asíncrona para obtener los datos de la API
  const getData = async () => {
    // Hacer petición a la API
    const result = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
    );

    // Establecer el valor de los datos obtenidos
    setCoin(result.data);

    // Mostrar datos obtenidos en consola
    // console.log(result.data)
  };
  // Obtener los datos cuando el componente cargue
  useEffect(() => {
    // Datos de la API
    getData()
  }, []);
  // Se obtienen los datos cuando el componente cargu
  useEffect(_ => {
    let a,b
    //Recorre el array para cada prop
    coin.forEach(({symbol, current_price}) =>{
      //Condicional que realiza la conversión de la cripto a la seleccionada por el usuario
      if(symbol == selCoin1){
        a = (mainTxt * current_price) / 1
      }else if(symbol == selCoin2){
        b = current_price
      }
    })
    //Actualiza el UseState
     a ? setRes(a / b) : setRes(0)
  },[mainTxt,selCoin1,selCoin2])

  return (
    <div className="contenedor">
      <h2>Comparación de Monedas</h2>
      <div className="input-convert">
        <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0} />
        <FaExchangeAlt className="icono" />
        <InputConvert coin={coin} sel="eth" fun={setSelCoin2} other={selCoin1} result={res}/>
      </div>
    </div>
  );
}
