import React, {useEffect, useState} from 'react';
import axios from "axios";
import {weatherConditions} from "../data/weatherConditions";

const WeatherForecast = ({ selectedTrip }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true)

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

    const getWeatherIcon = (condition) => {
        const matchingCondition = weatherConditions.find(
            (item) => item.condition === condition
        );

        return matchingCondition ? (
            <img className='weatherIcon' src={matchingCondition.img} alt={condition} />
        ) : (
            <p>{condition}</p>
        );
    };

    // Fetch weather data when selectedTrip changes
    useEffect(() => {
        if (selectedTrip) {
            fetchWeatherData().then(()=>{
                setLoading(false)
            })


        }
    }, [selectedTrip]);

    // Render weather data
    if (loading) {
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
                    <div key={day.datetime} style={{ margin: '20px', textAlign:'center' }}>
                        <p>{dayName}</p>
                        <p>{formattedDate}</p>
                        {getWeatherIcon(day.conditions.split(',')[0])}
                        <p>{Math.round(day.tempmax)}/{Math.round(day.tempmin)} &#8451;</p>
                    </div>
                );
            })}
        </div>
    </div>
    );
};

export default WeatherForecast;