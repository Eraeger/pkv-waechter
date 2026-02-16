import client from './client';

export const uploadReceipt = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await client.post('/upload', formData);
        return response.data;
    } catch (error) {
        console.error('Error uploading receipt:', error);
        throw error;
    }
};

export const confirmReceiptData = async (formData, file) => {
    const data = new FormData();
    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
    });
    // Append the original file
    if (file) {
        data.append('file', file);
    }

    try {
        const response = await client.post('/confirm', data);
        return response.data;
    } catch (error) {
        console.error('Error confirming data:', error);
        throw error;
    }
};
