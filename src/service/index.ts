import axios, { AxiosInstance } from "axios";

class Http {
    static instance: AxiosInstance = axios.create({
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const api = Http.instance;
export default api;