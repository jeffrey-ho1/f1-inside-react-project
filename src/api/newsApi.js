import axios from "axios";
import { NEWS_API_BASE_URL } from "../constants/apiConstants";

// Haal de API-sleutel op uit de .env
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;