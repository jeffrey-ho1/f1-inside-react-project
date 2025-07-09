

const mockDrivers = [
    { id: 'max_verstappen', name: 'Max Verstappen', team: 'Red Bull Racing' },
    { id: 'lewis_hamilton', name: 'Lewis Hamilton', team: 'Mercedes' },
    { id: 'lando_norris', name: 'Lando Norris', team: 'McLaren' },
    { id: 'charles_leclerc', name: 'Charles Leclerc', team: 'Ferrari' },
    { id: 'sergio_perez', name: 'Sergio Pérez', team: 'Red Bull Racing' },
    { id: 'oscar_piastri', name: 'Oscar Piastri', team: 'McLaren' },
];

const mockTeams = [
    { id: 'red_bull_racing', name: 'Red Bull Racing', points: 450 },
    { id: 'mercedes', name: 'Mercedes', points: 320 },
    { id: 'mclaren', name: 'McLaren', points: 280 },
    { id: 'ferrari', name: 'Ferrari', points: 250 },
    { id: 'aston_martin', name: 'Aston Martin', points: 180 },
];


export const getAllDrivers = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockDrivers);
        }, 500); // 500ms vertraging
    });
};


export const getAllTeams = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockTeams);
        }, 500); // 500ms vertraging
    });
};
