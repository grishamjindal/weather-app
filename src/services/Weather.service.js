export const fetchWeatherData = async (lat, long) => {
    return fetch(`${process.env.REACT_APP_WEATHER_API_URL}/forecast?latitude=${lat || 28.57}&longitude=${long || 77.10}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max,rain_sum&timezone=auto`)
        .then(res => res.json())
}
