import axios from "axios";
import {TRAVEL_PICKUP_LOCAL_STORAGE} from "../constants/localstorage.js";
import {TRAVEL_PICKUP_PATHS} from "../constants/routes.js";
class AxiosClient {

    constructor() {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_SERVER_API_URL})

        this.client.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response && error.response.status === 401) {
                    window.location.replace(TRAVEL_PICKUP_PATHS.LOGIN);
                }
                return Promise.reject(error);
            }
        );

    }

    getHeaders() {
        return {
            'Content-Type': "application/json",
            'Authorization': localStorage.getItem(TRAVEL_PICKUP_LOCAL_STORAGE.TOKEN) ? `Bearer ${localStorage.getItem(TRAVEL_PICKUP_LOCAL_STORAGE.TOKEN)}` : null
        }
    }

    getPostHeaders() {
        return {
            'Content-Type': "multipart/form-data",
            'Authorization': localStorage.getItem(TRAVEL_PICKUP_LOCAL_STORAGE.TOKEN) ? `Bearer ${localStorage.getItem(TRAVEL_PICKUP_LOCAL_STORAGE.TOKEN)}` : null
        }
    }

    get(url, config = {}) {
        return this.client.get(url, {...config, headers: this.getHeaders()});
    }

    post(url, data, config = {}) {
        return this.client.post(url, data, {...config, headers: this.getPostHeaders()});
    }

    put(url, data, config = {}) {
        return this.client.put(url, data, {...config, headers: this.getHeaders()});
    }

    delete(url, config = {}) {
        return this.client.delete(url, {...config, headers: this.getHeaders()});
    }

}


export default new AxiosClient();
