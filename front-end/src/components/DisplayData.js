import React, { useState, useEffect } from 'react';
import { fetchData, updateData } from '../databaseService';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataDisplay = ({ isDataRefreshNeeded }) => {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({}); // Initialize to an empty object

  useEffect(() => {
    if (isDataRefreshNeeded) {
      fetchDataFromBackend();
    }
  }, [isDataRefreshNeeded]); // Fetch data when isDataRefreshNeeded changes

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const fetchedData = await fetchData();
      setData(fetchedData);
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  const handleEditClick = (id, item) => {
    setEditItemId(id);
    setEditItemData(item);
  };

  const handleUpdate = async (id) => {
    try {
      const { url, baseurl, method } = editItemData;
      await updateData(id, url, baseurl, method);
      setEditItemId(null);
      fetchDataFromBackend();
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItemData({ ...editItemData, [name]: value });
  };

  return (
    <div className="container" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <h3 className="mt-4">Data Display</h3>
      {(!isDataLoaded || isDataRefreshNeeded) && (
        <div className="row mt-3">
          <div className="col">
            <div className="border border-dark rounded p-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>URL</th>
                    <th>Base URL</th>
                    <th>Method</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        {editItemId === item.id ? (
                          <input
                            type="text"
                            name="url"
                            value={editItemData.url || ''}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          item.url
                        )}
                      </td>
                      <td>
                        {editItemId === item.id ? (
                          <input
                            type="text"
                            name="baseurl"
                            value={editItemData.baseurl || ''}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          item.baseurl
                        )}
                      </td>
                      <td>
                        {editItemId === item.id ? (
                          <input
                            type="text"
                            name="method"
                            value={editItemData.method || ''}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        ) : (
                          item.method
                        )}
                      </td>
                      <td>
                        {editItemId === item.id ? (
                          <button className="btn btn-success" onClick={() => handleUpdate(item.id)}>Save</button>
                        ) : (
                          <button className="btn btn-info" onClick={() => handleEditClick(item.id, item)}>Edit</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
