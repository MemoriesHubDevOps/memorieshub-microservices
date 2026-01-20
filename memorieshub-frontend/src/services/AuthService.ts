import axiosInstance from "../utils/AxiosUtils"


export default class AuthService {

    static loginAsync = async (email : string, password: string) => {
        const response = await axiosInstance.post('/auth/login', { email, password });
        return response.data.token;
    }

    static verifyTokenAsync = async () => {
        await axiosInstance.get('/auth/verify-token');
    }
}