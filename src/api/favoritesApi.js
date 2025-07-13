import axios from 'axios';

const F1_API_DEV_URL = 'https://f1api.dev/api';
const API_SEASON = '2024';

export const getAllDrivers = async () => {
    try {
        const response = await axios.get(`${F1_API_DEV_URL}/current/drivers`);
        const driversArray = response.data.drivers;
        if (!Array.isArray(driversArray)) { return []; }

        return driversArray.map(driver => ({
            id: driver.driverId,
            name: `${driver.name} ${driver.surname}`,
            teamId: driver.teamId,
            nationality: driver.nationality,
        }));
    } catch (error) {
        console.error("Fout bij het ophalen van de coureurs:", error);
        return [];
    }
};


export const getDriverDetails = async (driverId) => {
    try {
        const response = await axios.get(`${F1_API_DEV_URL}/current/drivers/${driverId}`);

        if (response.data && response.data.driver) {
            return response.data.driver;
        } else {

            throw new Error('Coureur data niet gevonden in de verwachte structuur.');
        }
    } catch (error) {
        console.error(`Fout bij het ophalen van details voor coureur ${driverId}:`, error);
        return null;
    }
};

export const getAllTeams = async () => {
    try {
        const response = await axios.get(`${F1_API_DEV_URL}/current/teams`);
        const teamsArray= response.data.teams;

        if (!Array.isArray(teamsArray)) {
            console.error("Fout: De 'teams' property in de API-response is geen array.");
            return [];
        }
        return teamsArray.map(team => ({
            id: team.teamId,
            name: team.teamName,
        }));
    } catch (error) {
        console.error("Fout bij het ophalen van de teams:", error);
        return [];
    }
};


export const getTeamDetails = async (teamId) => {
    try {
        const response = await axios.get(`${F1_API_DEV_URL}/current/teams/${teamId}`);
        return response.data
    } catch (error) {
        console.error(`Fout bij het ophalen van details voor team ${teamId}:`, error);
        return null;
    }
};

export const getNextRace = async () => {
    try {

        const response = await axios.get(`${F1_API_DEV_URL}/current/next`);


        if (response.data && Array.isArray(response.data.race) && response.data.race.length > 0) {
            return response.data.race[0];
        }
        return null;

    } catch (error) {
        console.error("Fout bij het ophalen van de volgende race:", error);
        return null;
    }
};
