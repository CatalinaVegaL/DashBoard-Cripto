//Importacion de hooks
import {useEffect, useState} from 'react'
//Importacion de estilos
import "./App.css"; 
//Importacion de componentes
import CardPrincipal from './CardPrincipal';
import TableCoins from './TableCoins';
import Card from './Card'
import Convert from './Convert';
import Footer from './Footer'
import Header from './Header'
//Importacion de funciones
import {ThemeProvider} from "./Context/ThemeProvider";

//Funcion default con todos los componentes
export default function App() {
  const [coins, setCoins] = useState()
  const [currency, setCurrency] = useState()
  const [selCur, setSelCur] = useState("usd")
  //Funcion asincronica que llama de la API con elmetodo interno de JS fetch
  const getData = async () =>{
    /* const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h")
    console.log(res.data);
    setCoins(res.data); */
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`)
    const json = await response.json()
    const response_cur = await fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
    const cur = await response_cur.json()
    setCoins(json)
    setCurrency(cur)
  }
  useEffect(() => {
    getData()
  },[])
  useEffect(() => {
    getData()
  },[selCur])
  /* async function getApi(){
    /* fetch("https://api.coingecko.com/api/v3/simple/price?idszfsdf")
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(e => console.log("Error:",e))
    try{
      const response = await fetch("https://api.coingecko.com/api/v3/cosdfsd")
      const json = await response.json()
      console.log(json)
    }catch(e){
      console.log(e)
    }
  } */
  
  return (
    !coins ? "Cargando..." :(
    <div className='App'>
      <ThemeProvider>
        <Header currencys={currency} fun={setSelCur} cur={selCur}/>
      </ThemeProvider>
      <main>
        <CardPrincipal json={coins[0]} cur={selCur}/>
        <div className="cards_con">
          { coins.map(({id,symbol, image, current_price,price_change_percentage_30d_in_currency},index) =>{
            if(index != 0) {
            return <Card key={index} price={`${symbol} - ${current_price} ${selCur} `} porcentaje={deleteDec(price_change_percentage_30d_in_currency,2)} img={image} coinId={id} cur={selCur}/>
            }
          })
          }
        </div>
      </main>
      <Convert/>
      <TableCoins coins={coins}/>
      <Footer/>
    </div>
  )
  )

}
//Funcipón que elimina decimales
export function deleteDec(val, decimal) {
  return val.toFixed(decimal)
}
//Funcion que aplica color al numero dependiendo si es positivo o no
export function colorDec(num){
  return num > 0 ? "green" : "red"
}

export const numberF = Intl.NumberFormat("es-ES")
