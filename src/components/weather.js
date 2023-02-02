import moment from 'moment';

function Weather({ weatherData }) {  

    return (
        <div className="weather">
            {
                weatherData && weatherData.daily.time.map((time, index) => (
                    <div key={time} className='card'>
                        <div className='date'>{moment(time).format("Do MMM - ddd")}</div>
                        <div className='details first'>
                            <div>
                                <div className='title'>Max. temp</div>
                                <div className='desc'>{weatherData.daily.temperature_2m_max[index] + ' ' + weatherData.daily_units.temperature_2m_max}</div>
                            </div>
                            <div className='text-right'>
                                <div className='title'>Min. temp</div>
                                <div className='desc'>{weatherData.daily.temperature_2m_min[index] + ' ' + weatherData.daily_units.temperature_2m_min}</div>
                            </div>
                        </div>
                        <div className='details first second'>
                            <div>
                                <div className='title'>Sunrise</div>
                                <div className='desc'>{moment(weatherData.daily.sunrise[index]).format("h:mm a")}</div>
                            </div>
                            <div className='text-right'>
                                <div className='title'>Sunset</div>
                                <div className='desc'>{moment(weatherData.daily.sunset[index]).format("h:mm a")}</div>
                            </div>
                        </div>
                        <div className='details second'>
                            <div>
                                <div className='title'>Rainfall</div>
                                <div className='desc'>{weatherData.daily.rain_sum[index] + ' ' + weatherData.daily_units.rain_sum}</div>
                            </div>
                            <div className='text-right'>
                                <div className='title'>Wind</div>
                                <div className='desc'>{weatherData.daily.windspeed_10m_max[index] + ' ' + weatherData.daily_units.windspeed_10m_max}</div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Weather;
