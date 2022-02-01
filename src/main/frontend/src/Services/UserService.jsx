import axios from "axios"


const USER_REST_API_URL = "http://localhost:8080/api/users"

const USER_LOGIN_API_URL = "http://localhost:8080/api/Login"

const USERNAME_PARAM = "username="

const PASSWORD_PARAM = "password="


export default class UserService {
    
    static getUsers = () => {
        return axios.get(USER_REST_API_URL)
    }

    static addUser = (userdata) => {
        return axios.post(USER_REST_API_URL, userdata)
    }

    static login = (username, password) => {
        http://localhost:8080/api/Login?username=mnmr1996&password=Blackops2_
        return axios.get(USER_LOGIN_API_URL + "?" + USERNAME_PARAM + username + "&" + PASSWORD_PARAM + password)
    }




}

