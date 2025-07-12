// src/api/searchApi.js
import axios from 'axios';

const OPENF1_API_URL = 'https://api.openf1.org/v1';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getDriversFromOpenF1 = async () => {
    // TODO: Implementeer API-call
    return [];
};

export const getNewsFromNewsApi = async (query) => {
    // TODO: Implementeer API-call
    return [];
};

export const searchAll = async (query) => {
    console.log(`Zoeken naar: ${query}`);
    return [];
};