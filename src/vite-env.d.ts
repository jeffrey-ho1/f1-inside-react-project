/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Voeg hier jouw custom omgevingsvariabele toe
    readonly VITE_NEWS_API_BASE_URL: string;

    // Je kunt hier ook andere variabelen toevoegen die je gebruikt
    // readonly VITE_ANOTHER_VARIABLE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}