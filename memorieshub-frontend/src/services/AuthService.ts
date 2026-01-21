import axiosInstance from "../utils/AxiosUtils"


export default class AuthService {

    static loginAsync = async (email : string, password: string) => {
        const response = await axiosInstance.post('/auth/login', { email, password });
        return response.data;
    }

    static verifyTokenAsync = async () => {
        await axiosInstance.post('/auth/verify-token');
    }

    static signupAsync = async (name : string, email: string, password: string) => {
        const response = await axiosInstance.post('/auth/signup', {name: Date.now(), email, password})
        return response.data;
    }
}