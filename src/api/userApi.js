import axios from 'axios';
import { NOVI_API_BASE_URL } from '../constants/apiConstants';

// Herbruikbare functie voor autorisatie header
const getAuthConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});
