const BASE_URL = 'https://open.faceit.com/data/v4';
const options = {
    headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
    }
}

export const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}

export async function fetchMoreDataById(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}