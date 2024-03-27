import React, { useState, useEffect } from 'react';
import { fetchData, updateData } from '../databaseService';
import 'bootstrap/dist/css/bootstrap.min.css';
const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({});
  const [isFetchClicked, setIsFetchClicked] = useState(true); // Set to true initially
  useEffect(() => {
    if (isFetchClicked) {
      fetchDataFromBackend();
    }
  }, [isFetchClicked]); // Fetch data when isFetchClicked changes
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
      <h2 className="mt-4">Data Display</h2>
      {(!isDataLoaded || isFetchClicked) && (
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
                            value={editItemData.url}
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
                            value={editItemData.baseurl}
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
                            value={editItemData.method}
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