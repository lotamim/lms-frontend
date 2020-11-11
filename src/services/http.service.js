import axios from 'axios'
const API_URL = "http://localhost:8090/api/"


class Http {
    getAll (urls){
        return axios.get(API_URL+urls)
    }
}
export default new Http();