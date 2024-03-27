import React, { useState } from 'react';
import CreateForm from './CreateForm';
import DisplayData from './DisplayData';

const CombinedComponent = () => {
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const [isFetchClicked, setIsFetchClicked] = useState(false);

  const handleCreateClick = () => {
    setIsCreateClicked(true);
    setIsFetchClicked(false); // Ensure only one form is visible at a time
  };

  const handleFetchClick = () => {
    setIsCreateClicked(false);
    setIsFetchClicked(true);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {!isCreateClicked && !isFetchClicked && (
        <div className="d-flex gap-3">
          <button className="btn btn-primary btn-lg" onClick={handleCreateClick}>Create</button>
          <button className="btn btn-primary btn-lg" onClick={handleFetchClick}>Fetch</button>
        </div>
      )}
      {isCreateClicked && <CreateForm />}
      {isFetchClicked && <DisplayData />}
    </div>
  );
};

export default CombinedComponent;
