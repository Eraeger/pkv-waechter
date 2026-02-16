import client from './client';

export const uploadReceipt = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await client.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading receipt:', error);
        throw error;
    }
};
