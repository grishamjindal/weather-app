import { useEffect, useState } from 'react';
import Weather from './components/weather';
import { fetchWeatherData } from './services/Weather.service';
import SearchLocation from './components/searchLocation';
import './App.css';

function App() {

    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState(null);

  
  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('position')
        console.log(position)
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
  }, [])
  
  useEffect(() => {
    fetchData()
  }, [lat,long])

    const fetchData = async () => {
      let result = await fetchWeatherData(lat, long)      
      console.log(result)
      setData(result)
    }
  
  const handleSelection = (param) => {
    setLat(param.latitude);
    setLong(param.longitude);
  }

    return (
        <div className="App">
            <h2 className='heading'>Weather Forecast</h2>
                <SearchLocation handleSelection={handleSelection} />
            {
                data &&
                    <Weather weatherData={data} />
            }
        </div>
    );
}

export default App;
