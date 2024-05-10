import axios from "axios";
class AxiosClient {

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:8080'})

        this.client.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response && error.response.status === 401) {
                    window.location.replace('/login');
                }
                return Promise.reject(error);
            }
        );

    }

    getHeaders() {
        return {
            'Content-Type': "application/json",
            'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
        }
    }

    getPostHeaders() {
        return {
            'Content-Type': "multipart/form-data",
            'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
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
