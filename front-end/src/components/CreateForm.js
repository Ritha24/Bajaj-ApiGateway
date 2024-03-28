import React, { useState } from 'react';
import { addData } from '../databaseService';
import './CreateForm.css'; // Import CSS file

const CreateForm = ({ onClose }) => {
    const [formData, setFormData] = useState({ url: '', baseurl: '', method: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addData(formData.url, formData.baseurl, formData.method);
            setFormData({ url: '', baseurl: '', method: '' });
            alert('Data added successfully');
            onClose(); // Close the modal
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Error adding data:', error);
            alert('Failed to add data. Please try again.');
        }
    };

    // Check if any of the input fields are empty
    const isFormEmpty = Object.values(formData).some(value => value.trim() === ''); // trim() to ignore whitespace-only inputs

    return (
        <div className="create-form-container">
            <h2>Create Data</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="Enter URL"
                />
                <input
                    type="text"
                    name="baseurl"
                    value={formData.baseurl}
                    onChange={handleChange}
                    placeholder="Enter Base URL"
                />
                <input
                    type="text"
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                    placeholder="Enter Method"
                />
                {/* Disable the button if any input field is empty */}
                <button type="submit" disabled={isFormEmpty}>Create</button>
            </form>
        </div>
    );
};


export default CreateForm;
