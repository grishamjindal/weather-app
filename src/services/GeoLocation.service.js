export const fetchCities = async (param) => {
    return fetch(`${process.env.REACT_APP_GEOLOCATION_API_URL}/city?name=${param}&limit=10`, {
        method: 'GET',
        headers: {
            'X-Api-Key': process.env.REACT_APP_GEOLOCATION_API_KEY,
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
}
