import axios from "axios"
const USER_REST_API_URL = "http://localhost:8080/api/users"

export default class UserService {
    
    static getUsers = () => {
        return axios.get(USER_REST_API_URL)
    }

    static addUser = (userdata) => {
        return axios.post(USER_REST_API_URL, userdata)
    }

}
