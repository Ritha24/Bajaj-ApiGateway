// frontend/src/databaseService.js
export const addData = async (url, baseurl, method) => {
    try {
        const response = await fetch('http://localhost:5001/api/addData', { // Update the URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, baseurl, method }),
        });
        if (!response.ok) {
            throw new Error('Failed to add data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to add data. Please try again.');
    }
};

export const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/fetchData');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data. Please try again.');
    }
};

export const updateData = async (id, url, baseurl, method) => {
    try {
        const response = await fetch(`http://localhost:5001/api/updateData/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, baseurl, method }),
        });
        if (!response.ok) {
            throw new Error('Failed to update data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to update data. Please try again.');
    }
};

// Add a function to fetch the updated value
export const fetchUpdatedValue = async () => {
    try {
        const response = await fetch('http://localhost:5001/api/updatedValue');
        if (!response.ok) {
            throw new Error('Failed to fetch updated value');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch updated value. Please try again.');
    }
};