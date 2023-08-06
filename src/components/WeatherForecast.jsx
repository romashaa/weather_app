import React, {useEffect, useState} from 'react';
import axios from "axios";
import fetchWeatherData from "../weatherApi";
import ForecastComponent from "./ForecastComponent";

const WeatherForecast = ({ selectedTrip }) => {
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async () => {
        const apiKey = 'VEXZE3VY8T85AKAS5JSPTQUQN';
        const { startDate, endDate } = selectedTrip;

        try {
            const response = await axios.get(
                `/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.cityName}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    // Fetch weather data when selectedTrip changes
    useEffect(() => {
        if (selectedTrip) {
            fetchWeatherData();
        }
    }, [selectedTrip]);

    // Render weather data
    if (!weatherData) {
        return <p>Loading...</p>;
    }

    return (

    <div>
        <div style={{ display: 'flex', width:'50%', overflowX: 'auto' }}>
            {weatherData.days.map((day) => {
                // Format the date to display day name and date
                const date = new Date(day.datetime);
                const dayName = date.toLocaleString('en-US', { weekday: 'long' });
                const formattedDate = date.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                });

                return (
                    <div key={day.datetime} style={{ margin: '8px' }}>
                        <p>{dayName}</p>
                        <p>{formattedDate}</p>
                        <p>{day.tempmax}/{day.tempmin} &#8451;</p>
                        <p>{day.conditions}</p>
                        {/* Add more weather data as needed */}
                    </div>
                );
            })}
        </div>
    </div>
    );
};

export default WeatherForecast;