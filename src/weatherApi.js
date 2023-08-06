const apiKey = 'VEXZE3VY8T85AKAS5JSPTQUQN';

const fetchWeatherData = async (cityName, startDate, endDate) => {
    try {
        const apiUrl = `/VisualCrossingWebServices/rest/services/timeline/${cityName}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            // Handle the error if the response is not OK (status code not in the range 200-299)
            throw new Error('Weather data request failed');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        // Handle any other errors that might occur during the fetch
        console.error('Error fetching weather data:', error);
        return null;
    }
};

export default fetchWeatherData;