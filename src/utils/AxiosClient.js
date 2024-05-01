import axios from "axios";


class AxiosClient {

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:8080'
        })
    }

    getHeaders() {
        return {
            'Content-Type': "application/json",
            'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
        }
    }

    get(url, config = {}) {
        return this.client.get(url, {...config, headers: this.getHeaders()});
    }

    post(url, data, config = {}) {
        return this.client.post(url, data, {...config, headers: this.getHeaders()});
    }

    put(url, data, config = {}) {
        return this.client.put(url, data, {...config, headers: this.getHeaders()});
    }

    delete(url, config = {}) {
        return this.client.delete(url, {...config, headers: this.getHeaders()});
    }

}


export default new AxiosClient();