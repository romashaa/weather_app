import React from 'react';

const CityTripComponent = ({ cityName, arrivalDate, departureDate, imageUrl }) => {
    return (
        <div className="trip-card">
            <img src={imageUrl} alt={`City of ${cityName}`} className="city-image" />
            <h3 className="city-name">{cityName}</h3>
            <p className="dates">Arrival: {arrivalDate}</p>
            <p className="dates">Departure: {departureDate}</p>
        </div>
    );
};

export default CityTripComponent;