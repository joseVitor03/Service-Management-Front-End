import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      NEXT_PUBLIC_API_URL: API_URL,
    },
    supportFile: false,
  },
});
