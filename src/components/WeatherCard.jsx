import React, { useState } from 'react'

const WeatherCard = ({ weather, temperature, isCelsius, changeUnitTemp, newCallAPISearch }) => {

    const [place, setPlace] = useState("")

    const handleChangePlace = (e) => {
        setPlace(e.target.value)
    }
    return (
        <article className="weatherCard">
            <h1 className='weatherCard-title'>Weather App</h1>
            <div className='search-box'>
                <input
                    className="weatherCard-input"
                    type="text"
                    value={place}
                    onChange={handleChangePlace}
                />
                <button className="weatherCard-button-search" onClick={() => newCallAPISearch(place)}>Search</button>
            </div>
            <h3>{`${weather.name}, ${weather.sys.country}`}</h3>
            <div className='img-animation'>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            </div>
            <section className='weatherCard-body'>
                <ul>
                    <li><span>Weather:</span>  {weather.weather[0].description}</li>
                    <li><span>Wind speed:</span> {weather.wind.speed}m/s</li>
                    <li><span>Clouds:</span>   {weather.clouds.all} %</li>
                    <li><span>Pressure:</span>  {weather.main.pressure} hPa</li>
                </ul>
            </section>
            <p className='temperature'>{isCelsius ? `${temperature.celsius} °C` : `${temperature.farenheit} °F`}</p>
            <button className='weatherCard-button-units' onClick={changeUnitTemp}>°F/°C</button>
        </article >
    )
}

export default WeatherCard