import axios from "axios";

export default restClient = () => {
    const axiosConfig = {
        // baseURL: process.env.API_URL,
        baseURL: 'http://localhost:8080',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };
    return axios.create(axiosConfig);
}