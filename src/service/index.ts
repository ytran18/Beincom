import axios, { AxiosInstance } from "axios";

export class Http {
    instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: 'https://jsonplaceholder.typicode.com',
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
};

const api = new Http().instance;
export default api;