import axios from "axios";
import { useState } from "react";
import "./index.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1a01281639a5f4e7c172e2780fb0f6d6`;

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
            setData(response.data);
            console.log(response.data);
          });
      setLocation('')
    }
  };

  return (
    <>
      <div className="app">
        <div className="search">
          <input 
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text"
          />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{parseFloat((data.main.temp-273).toFixed(1))}°c</h1>:null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data.name != undefined &&
            <div className="bottom">
              <div className="feels">
              {data.main ? <p className="bold">{parseFloat((data.main.feels_like-273).toFixed(1))}°c</p>:null}
                <p>Feels like</p>
              </div>
              <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p>:null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className="bold">{parseFloat(data.wind.speed *1.6).toFixed(1)} kmph</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          }

        </div>
      </div>
    </>
  );
}

export default App;
//34c6ccf325436e2a83e2d92eff262a9c
