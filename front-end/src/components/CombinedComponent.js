import React, { useState } from 'react';
import CreateForm from './CreateForm';
import DisplayData from './DisplayData';
import logo from './logo.png'; // Import your logo file

const CombinedComponent = () => {
  const [isCreateClicked, setIsCreateClicked] = useState(false); // Set initial state to true
  const [isFetchClicked, setIsFetchClicked] = useState(true);

  const handleCreateClick = () => {
    setIsCreateClicked(true);
    setIsFetchClicked(false); // Ensure only one form is visible at a time
  };

  const handleFetchClick = () => {
    setIsCreateClicked(false);
    setIsFetchClicked(true);
  };

  return (
    <div className="container vh-100">
      <div className="fixed-top bg-light p-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center"> {/* Logo and Header */}
          <img src={logo} alt="Logo" style={{ width: '100px', height: '70px', marginRight: '20px', marginLeft:'20px'}} /> {/* Adjust width and height as needed */}
          {/* <h1>Header</h1> Your header content goes here */}
        </div>
        <div> {/* Right-aligned buttons */}
          <button className="btn btn-primary btn-md me-2" onClick={handleCreateClick}>Create</button>
          {/* <button className="btn btn-primary btn-md" onClick={handleFetchClick}>Fetch</button> */}
        </div>
      </div>
      <div className="mt-5"> {/* Add margin-top to push content below fixed header */}
        {isCreateClicked && <CreateForm handleFetchClick={handleFetchClick} />}
        {isFetchClicked && <DisplayData />}
      </div>
    </div>
  );
};

export default CombinedComponent;
