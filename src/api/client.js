import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_N8N_BASE_URL || 'https://n8n.srv1298402.hstgr.cloud/webhook',
    timeout: 30000, // Increased timeout for uploads
});

export default client;
