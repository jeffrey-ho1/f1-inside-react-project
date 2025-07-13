import axios from 'axios';
import { NOVI_API_BASE_URL } from '../constants/apiConstants';


const getAuthConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});


export async function getUserData(token) {

    const response = await axios.get(`${NOVI_API_BASE_URL}/users/me`, getAuthConfig(token));
    return response.data;
}


export async function updateUserData(token, data) {

    const response = await axios.put(`${NOVI_API_BASE_URL}/users/me`, { info: data }, getAuthConfig(token));
    return response.data;
}