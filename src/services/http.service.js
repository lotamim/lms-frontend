import axios from 'axios'
import authHeader from './authHeader.service';
// const API_URL = "http://localhost:8090/api/"
import { API_URL } from "../components/constant/Constants"


class Http {
    save(path, data) {
        return axios.post(API_URL + path, data, { headers: authHeader() })
    }
    update(path, data) {
        return axios.post(API_URL + path, data, { headers: authHeader() })
    }
    delete(path, data) {
        return axios.post(API_URL + path, data, { headers: authHeader() })
    }
    getAll(urls) {
        return axios.get(API_URL + urls)
    }
}
export default new Http();