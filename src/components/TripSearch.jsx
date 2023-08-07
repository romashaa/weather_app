import React from 'react';

const TripSearch = ({searchTerm, handleSearchChange}) => {

    return (
        <div className="trip-search">
            <input
                className="trip-search-field"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="&#128270; Search your trip"
            />
        </div>
    );
};

export default TripSearch;