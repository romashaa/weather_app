import React, {useEffect, useState} from 'react';
import {weatherConditions} from "../weatherConditions";
import axios from "axios";

const TripDetails = ({ selectedTrip }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [countdown, setCountdown] = useState(0);

    const fetchWeatherData = async () => {
        const apiKey = 'VEXZE3VY8T85AKAS5JSPTQUQN';
        const today = new Date().toISOString().split('T')[0];

        try {
            const response = await axios.get(
                `/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.cityName}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`
            );

            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const calculateCountdown = () => {
        const startDate = new Date(selectedTrip.startDate).getTime();
        const currentDate = new Date().getTime();
        const diffInMilliseconds = startDate - currentDate;

        const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
    };

    useEffect(() => {
        if (selectedTrip) {
            fetchWeatherData();
            calculateCountdown();

            // Update countdown every minute
            const intervalId = setInterval(calculateCountdown, 1000);

            return () => clearInterval(intervalId);
        }
    }, [selectedTrip]);

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

    if (!selectedTrip || !weatherData) {
        return null;
    }

    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        // year: 'numeric',
        // month: 'long',
        // day: 'numeric',
    });

    return (
        <div className='trip-details'>
            <div style={{marginTop:'30%'}}>
                <h1>{formattedDate}</h1>
                {getWeatherIcon(weatherData.days[0].conditions.split(',')[0])}
                <h1>{weatherData.days[0].temp} &#8451;</h1>
                <h3>{weatherData.address}</h3>
                <p style={{ display: 'flex', justifyContent: 'space-between', padding:'20px' }}>
                <span>
                    <h2>{countdown.days}</h2> days
                </span><span>
                  <h2>{countdown.hours}</h2> hours
                </span><span>
                  <h2>{countdown.minutes}</h2>  minutes
                </span><span>
                  <h2>{countdown.seconds}</h2> seconds
                </span>
                </p>
            </div>

        </div>
    );
};

export default TripDetails;