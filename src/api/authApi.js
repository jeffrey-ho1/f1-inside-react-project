import axios from 'axios'

const apiKey = import.meta.env.VITE_FONEINSIDE_API_KEY;

export async function registerUser(userData) {
    const { username, email, password } = userData;
    const response = await axios.post('https://api.datavortex.nl/foneinside/users',{
        username,
        email,
        password,
        roles: ["USER"]
    }, {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': apiKey
        }
    });
    return response.data;
}

export async function loginUser(credentials) {
    const { username, password } = credentials;
    const response = await axios.post('https://api.datavortex.nl/foneinside/users/authenticate', {
        username,
        password
    },{
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': apiKey
        }
    });
    return response.data;
}