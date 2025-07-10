import axios from 'axios';

const API_BASE_URL = 'https://api.datavortex.nl/foneinside';

export const getUserData = async (username, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${username}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (e) {
        console.error("Fout bij ophalen gebruikersdata", e);
        return null;
    }
};

export const updateUserData = async (username, data, token) => {
    try {
        await axios.put(`${API_BASE_URL}/users/${username}`, {
            info: data,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
    } catch (e) {
        console.error("Fout bij bijwerken gebruikersdata", e);
    }
};
