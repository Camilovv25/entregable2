
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelcius] = useState(true)


  //obtenemos las coordenadas de la API del navegador y las montamos en un estado
  const success = (pos) => {

    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }

    setCoords(newCoords)
  }
  const newCallAPISearch = (cityName) => {
    const API_KEY = "104b29d52f0963fe021ae7a0ae8f0056"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    axios.get(URL)
      .then(res => setWeather(res.data))
      .catch(err => alert(`Not found "${cityName}", try with other place.`))
  }
  const changeUnitTemp = () => setIsCelcius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  //---------peticion de datos a la API del clima----------
  useEffect(() => {
    if (coords) {
      const API_KEY = "104b29d52f0963fe021ae7a0ae8f0056"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          const tempKelvin = res.data.main.temp
          const tempCelsius = (tempKelvin - 273.15).toFixed(1)
          const tempFarenheit = ((tempCelsius * 9 / 5) + 32).toFixed(1)
          const newTemperature = {
            celsius: tempCelsius,
            farenheit: tempFarenheit
          }
          setTemperature(newTemperature)
          setWeather(res.data)
        })

        .catch(err => console.log(err))
    }

  }, [coords])

  return (
    <div className="App">
      {
        weather ? (
          <WeatherCard
            weather={weather}
            temperature={temperature}
            changeUnitTemp={changeUnitTemp}
            isCelsius={isCelsius}
            newCallAPISearch={newCallAPISearch}
          />
        ) : <p>Cargando...</p>
      }
    </div>
  )
}

export default App
