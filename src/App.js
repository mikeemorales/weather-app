import './App.css';
import { useState } from 'react';

const api = {
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          // console.log(result); <-- checking to see if json data will show
        });
    }
  }

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
      "November", "December"];

    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${month} ${date}, ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 80) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="search..."
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          ></input>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°F</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
