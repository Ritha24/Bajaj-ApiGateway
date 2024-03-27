// frontend/src/components/CreateForm.js
import React, { useState } from 'react';
import { addData } from '../databaseService';
import './CreateForm.css'; // Import CSS file

const CreateForm = () => {
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
        } catch (error) {
            console.error('Error adding data:', error);
            alert('Failed to add data. Please try again.');
        }
    };

    return (
        <div className="create-form-container"> {/* Apply the container class */}
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
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateForm;
