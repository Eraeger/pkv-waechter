import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_N8N_BASE_URL || 'https://n8n.srv1298402.hstgr.cloud/webhook-test',
    timeout: 60000, // Increased to 60s for Gemini extraction
});

export default client;
