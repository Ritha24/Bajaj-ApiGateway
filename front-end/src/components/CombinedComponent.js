import React, { useState } from 'react';
import CreateForm from './CreateForm';
import DisplayData from './DisplayData';
import logo from './logo.png'; // Import your logo file

const CombinedComponent = () => {
  const [isCreateClicked, setIsCreateClicked] = useState(false); // Set initial state to false

  const handleCreateClick = () => {
    setIsCreateClicked(true);
  };

  const handleCloseCreateForm = () => {
    setIsCreateClicked(false);
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
        {isCreateClicked && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Form</h5>
                  <button type="button" className="close" onClick={handleCloseCreateForm} aria-label="Close" style={{ position: 'absolute', top: '15px', right: '15px', zIndex: '1' }}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <CreateForm />
                </div>
                {/* <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseCreateForm}>Close</button>
                </div> */}
              </div>
            </div>
          </div>
        )}
        <DisplayData />
      </div>
    </div>
  );
};

export default CombinedComponent;
