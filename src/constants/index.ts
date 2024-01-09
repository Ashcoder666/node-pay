import dotenv from 'dotenv'


dotenv.config()

export const PORT = process.env.PORT || 4000;
export const DEVELOPMENT_URL = `http://localhost:${PORT}`;
export const PRODUCTION_URL = process.env.PRODUCTION_URL;