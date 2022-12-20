//Importación de los estilos CSS 
import "./Graph.css"
//Importación de Hooks desde react
import {useEffect, useState, useRef} from 'react'
//Importación de Line desde la libreria react-chartjs-2
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
   //Analizar, validar, manipular,. y mostrar fechas y horas en JavaScript.
import moment from "moment/moment";

//Todos los gráficos tendrán estos plugings
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)
//Exportamos la gráfica con aglunos parametros iniciales a las props de la API
export default function Graph({type = 1, coin = "bitcoin", currency = "usd", days = 30,color = "#04D99D"}){
    const chartStyle = {
        border: {
            display: false
        },
        grid:{
            display: false,  
        },
        ticks: {
            display: false
        }
    }
    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
    let data , options
    const [prices, setPrices] = useState()
    const [dates, setDates] = useState()
    const [gradient, setGradient] = useState()
    async function getData(){
        try{
            const response = await fetch(url)
            const json = await response.json()
            setPrices(json.prices.map(item => Math.round(item[1])))
            setDates(json.prices.map(item => moment.unix(item[0]).format("MM-DD")))
        }catch(e){
            console.log("error:",e)
        }
    }
    const chartRef = useRef(null);
    
    useEffect(_ => {
        getData()
        const canvas = chartRef.current.firstChild
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height);
        BGgradient.addColorStop(0, 'rgba(4, 191, 157, 1)');   
        BGgradient.addColorStop(1, 'rgba(4, 191, 157, 0)')
        setGradient(BGgradient)
    },[])
    
    
    //Creamos un switch con diferente casos que modifican la forma en como podemos ver las gráfocas del dashboard
    switch(type){
        case 0:

            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x:{
                        grid:{
                            display: false
                        }
                    },
                    y:{
                        grid:{
                            display: false
                        },
                        ticks: {
                            callback: function(value, index, ticks) {
                                return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.toUpperCase()}`;
                            }
                        }
                    }
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    backgroundColor: gradient,
                    tension: .4,
                    pointRadius: 0,
                    fill: true
                  }
                ]
              }
              break
        case 1:
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  }
                },
                scales: {
                    x: chartStyle,
                    y: chartStyle
                }
              }
            data = {
                labels: dates,
                datasets: [
                  {
                    data: prices,
                    borderColor: color,
                    tension: .4,
                    pointRadius: 0,
                  }
                ]
              }
            break
    }
    return (
        <div ref={chartRef} className="graph">
            <Line data={data} options={options}/>
        </div> 
    )
}