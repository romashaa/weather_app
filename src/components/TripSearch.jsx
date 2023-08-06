import React from 'react';

const TripSearch = ({searchTerm, handleSearchChange}) => {

    return (
        <div className="trip-search">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search your trip"
            />
        </div>
    );
};

export default TripSearch;