import React, {useState} from 'react';

const AddTripModal = ({ showModal, setShowModal, addNewTrip, cities }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCity, setSelectedCity] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedCityObject = cities.find((city) => city.cityName === selectedCity);

        if (selectedCityObject) {
            addNewTrip({
                cityName: selectedCityObject.cityName,
                img: selectedCityObject.imageUrl,
                startDate,
                endDate,
            });
        }
        console.log(endDate)
        setSelectedCity('');
        setStartDate('');
        setEndDate('');
        setShowModal(false);
    };
    const today = new Date().toISOString().split('T')[0];
    const maxEndDate = new Date();
    maxEndDate.setDate(maxEndDate.getDate() + 15);
    const maxEndDateStr = maxEndDate.toISOString().split('T')[0];

    return (
        <div className={`modal ${showModal ? 'show' : ''}`}>
            <form onSubmit={handleSubmit} className="modal-content">
                <h2>Create New Trip</h2>
                <label htmlFor="cityName">City:</label>
                <select
                    className='modal-input'
                    id="cityName"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    required
                >
                    <option value="">Select a city</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city.cityName}>
                            {city.cityName}
                        </option>
                    ))}
                </select>
                <label htmlFor="startDate">Start Date:</label>
                <input
                    className='modal-input'
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    min={today}
                    max={maxEndDateStr}
                />
                <label htmlFor="endDate">End Date:</label>
                <input
                    className='modal-input'
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    min={startDate}
                    max={maxEndDateStr}
                />
                <button className="modal-button" type="submit">Create Trip</button>
                <button className="modal-button" onClick={() => setShowModal(false)}>
                    Close
                </button>
            </form>
        </div>
    );
};

export default AddTripModal;