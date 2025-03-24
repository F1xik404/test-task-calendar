import axiosInstance from "./axiosInstance.ts";

export const getEvents = async () => {
    try {
        const response = await axiosInstance.get('/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

export const newEvent = async (data: any) => {
    try{
        const response = await axiosInstance.post('/events', data);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}

export const updateEvent = async (id: number, data: any) => {
    try {
        const response = await axiosInstance.put(`/events/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
    }
}

export const deleteEvent = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/events/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting event:', error);
    }
}