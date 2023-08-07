import './App.css';
import './global-styles.css'
import {cities} from "./cities";
import TripList from "./components/TripList";
import React, {useEffect, useState} from "react";
import AddTripModal from "./components/AddTripModal";
import TripSearch from "./components/TripSearch";
import WeatherForecast from "./components/WeatherForecast";
import TripDetails from "./components/TripDetails";
import Header from "./components/Header";

function App() {
    const [showModal, setShowModal] = useState(false);

    const [trips, setTrips] = useState([
        {
            img: cities[0].imageUrl,
            cityName: 'Kyiv',
            startDate: '2023-08-20',
            endDate: '2023-08-22',
        },
    ]);
    const [filteredTrips, setFilteredTrips] = useState(trips);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedTrip, setSelectedTrip] = useState(null);
    const handleTripClick = (trip) => {
        setSelectedTrip(trip);
    };
    useEffect(() => {
        if (selectedTrip) {
            console.log("City name: " + selectedTrip.cityName);
            console.log("Start: " + selectedTrip.startDate);
            console.log("End: " + selectedTrip.endDate);
        }
    }, [selectedTrip]);

    const addNewTrip = (newTrip) => {
        setTrips([...trips, newTrip]);
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);;
    };

    useEffect(() => {
        // Reset filteredTrips to all trips when searchTerm is empty
        if (searchTerm === '') {
            setFilteredTrips(trips);
        }
        const filteredTrips = trips.filter((trip) =>
            trip.cityName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTrips(filteredTrips);
    }, [searchTerm, trips]);

  return (
    <div className="App">
        <AddTripModal
            showModal={showModal}
            setShowModal={setShowModal}
            addNewTrip={addNewTrip}
            cities={cities}
        />

        <Header/>
        <TripSearch searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>

        <div className="trip-list-container">
            <TripList trips={filteredTrips} onTripClick={handleTripClick}/>
            <button className="add-trip-button" onClick={() => setShowModal(true)}>
                <div className="button-content">
                    <div className="plus-icon">+</div>
                    <div className="button-text">Add Trip</div>
                </div>
            </button>
        </div>
        {selectedTrip && <WeatherForecast selectedTrip={selectedTrip}/>}
        {selectedTrip && <TripDetails selectedTrip={selectedTrip} />}
    </div>
  );
}

export default App;
