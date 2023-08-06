import React, {useEffect, useState} from 'react';
import axios from "axios";

const ForecastComponent = () => {
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = 'VEXZE3VY8T85AKAS5JSPTQUQN';
    const CITY_NAME = 'New York'; // Replace with the desired city

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `/VisualCrossingWebServices/rest/services/timeline/${CITY_NAME}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`);
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        fetchWeatherData();
    }, []);

    return (
        <div>
            {weatherData ? (
                <div>
                    <h2>{weatherData.resolvedAddress}</h2>
                    <p>Date: {weatherData.days[0].datetime}</p>
                    <p>Max Temperature: {weatherData.days[0].tempmax}°C</p>
                    <p>Min Temperature: {weatherData.days[0].tempmin}°C</p>
                    <p>Average Temperature: {weatherData.days[0].temp}°C</p>
                    <p>Conditions: {weatherData.days[0].conditions}</p>
                    {/* Add more weather data fields as needed */}
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default ForecastComponent;