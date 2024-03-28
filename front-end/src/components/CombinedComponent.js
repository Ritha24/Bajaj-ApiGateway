import React, { useState } from 'react';
import CreateForm from './CreateForm';
import DisplayData from './DisplayData';
import logo from './logo.png';

const CombinedComponent = () => {
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const [isDataRefreshNeeded, setIsDataRefreshNeeded] = useState(true); // Set to true initially to display the grid

  const handleCreateClick = () => {
    setIsCreateClicked(true);
  };

  const handleCloseCreateForm = () => {
    setIsCreateClicked(false);
    setIsDataRefreshNeeded(true); // Trigger data refresh
    console.log('Form closed, refreshing data...');
  };

  const handleDataRefresh = () => {
    setIsDataRefreshNeeded(prevState => !prevState); // Toggle to trigger data refresh
    console.log('Data refreshed!');
  };

  console.log('Rendering CombinedComponent');

  return (
    <div className="container-fluid p-0">
      <div className="bg-light p-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" style={{ width: '100px', height: '70px', marginRight: '20px', marginLeft: '20px' }} />
        </div>
        <div>
          <button className="btn btn-primary btn-md me-2" onClick={handleCreateClick}>Create</button>
        </div>
      </div>
      <div className="container mt-5">
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
                  <CreateForm onClose={handleCloseCreateForm} onDataRefresh={handleDataRefresh} />
                </div>
              </div>
            </div>
          </div>
        )}
        <DisplayData isDataRefreshNeeded={isDataRefreshNeeded} />
      </div>
    </div>
  );
};

export default CombinedComponent;
