import React from 'react';
import {cities} from "../cities";

const TripList = ({trips}) => {
    return (
        <div className="trip-list">
            {trips.map((trip, index) => (
                <div key={index} className="trip-card">
                    {/* Display trip information */}
                    <img src={trip.img} alt={`City of ${trip.cityName}`} className="city-image" />
                    <h3 className="city-name">{trip.cityName}</h3>
                    <p className="dates">{trip.startDate} - {trip.endDate}</p>
                </div>
            ))}
        </div>
    );
};

export default TripList;