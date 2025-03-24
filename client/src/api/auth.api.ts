import {LoginData, RegisterData} from "../interfaces/auth.interfaces.ts";
import axiosInstance from "./axiosInstance.ts";

export const loginUser = async (data: LoginData) => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email: data.email,
            password: data.password,
        });

        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await axiosInstance.post('/auth/register', {
            name: data.name,
            email: data.email,
            password: data.password,
        });

        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};