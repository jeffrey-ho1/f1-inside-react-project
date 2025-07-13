import axios from 'axios';
import { OPENF1_API_BASE_URL } from '../constants/apiConstants';


export async function fetchMeetings() {
        const response = await fetch('https://api.openf1.org/v1/meetings');
        if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
        }
        return await response.json();
    }


export async function getTrackWeather() {
    try {
        const response = await axios.get(`${OPENF1_API_BASE_URL}/weather?session_key=latest`);
        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
            return null;
        }       catch (error) {
            console.error("Fout bij ophalen van OpenF1 weer:", error.response?.data || error.message);
            throw error;
        }
}