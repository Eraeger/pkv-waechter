import axios from 'axios';

const client = axios.create({
    baseURL: 'https://n8n.srv1298402.hstgr.cloud/webhook',
    timeout: 10000,
});

export default client;
