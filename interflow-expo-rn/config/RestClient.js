import axios from "axios";

export default restClient = () => {
    const axiosConfig = {
        baseURL: process.env.API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };
    return axios.create(axiosConfig);
}