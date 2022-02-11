import axios from "axios";

const USER_REST_API_URL = "http://localhost:8080/api/users";

const USER_POST_API_URL = "http://localhost:8080/api/posts/";

const USER_LOGIN_API_URL = "http://localhost:8080/login";

const USERNAME_PARAM = "username=";

const PASSWORD_PARAM = "password=";

export default class UserService {
    static getUsers = () => {
        return axios.get(USER_REST_API_URL);
    };

    static addUser = (userdata) => {
        return axios.post(USER_REST_API_URL, userdata);
    };

    static post = (username, post) => {
        let urlString = USER_POST_API_URL;
        urlString += username;
        urlString += "/post";

        let demo = "http://localhost:8080/api/posts/mnmr1996/post";

        console.log(urlString);
        console.log(demo);
        return axios({
            method: "POST",
            url: urlString,
            headers: { "Content-Type": "application/json" },
            data: post,
        })
            .then(() => {
                window.location.reload(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    static login = (username, password) => {
        const params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        return axios.post(USER_LOGIN_API_URL, params);
    };
}
