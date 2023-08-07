import React, {useState} from 'react';

const TripList = ({ trips, onTripClick }) => {
    const [selectedTripIndex, setSelectedTripIndex] = useState(null);

    const handleTripCardClick = (trip, index) => {
        onTripClick(trip);
        setSelectedTripIndex(index);
    };

    const handleNextClick = () => {
        if (selectedTripIndex !== null && selectedTripIndex < trips.length - 1) {
            const nextIndex = selectedTripIndex + 1;
            handleTripCardClick(trips[nextIndex], nextIndex);
        }
    };

    const handlePreviousClick = () => {
        if (selectedTripIndex !== null && selectedTripIndex > 0) {
            const previousIndex = selectedTripIndex - 1;
            handleTripCardClick(trips[previousIndex], previousIndex);
        }
    };

    return (
        <div>
            <div className="trip-list">
                {trips.map((trip, index) => (
                    <div
                        key={index}
                        className={`trip-card ${selectedTripIndex === index ? 'selected' : ''}`}
                        onClick={() => handleTripCardClick(trip, index)}
                    >
                        <img src={trip.img} alt={`City of ${trip.cityName}`} className="city-image" />
                        <h3 className="city-name">{trip.cityName}</h3>
                        <p className="dates">
                            {trip.startDate} - {trip.endDate}
                        </p>
                    </div>
                ))}
            </div>
            <div className="buttons-container">
                <button className="scroll-button" onClick={handlePreviousClick} disabled={selectedTripIndex === 0}>
                    &#8678;
                </button>
                <button className="scroll-button" onClick={handleNextClick} disabled={selectedTripIndex === trips.length - 1}>
                    &#8680;
                </button>
            </div>
        </div>
    );
};




export default TripList;