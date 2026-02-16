import client from './client';

export const getStatus = async () => {
    try {
        const response = await client.get('/status');
        return response.data;
    } catch (error) {
        console.error('Error fetching status:', error);
        throw error;
    }
};
