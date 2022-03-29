import axios from "axios";

const USER_REST_API_URL = "http://localhost:8080/api/users/";

const USER_FRIEND_POST_API_URL = "http://localhost:8080/api/friends/posts/";

const USER_POST_API_URL = "http://localhost:8080/api/posts/";


const USER_LOGIN_API_URL = "http://localhost:8080/login";

export default class UserService {
    static getUsers = () => {
        return axios.get(USER_REST_API_URL);
    };

    

    static getUser = (username) => {
        const urlString = USER_REST_API_URL + username;
        return axios.get(urlString);
    };

    static addUser = (userdata) => {
        return axios.post(USER_REST_API_URL, userdata);
    };

    static post = (username, post) => {
        let urlString = USER_POST_API_URL;
        urlString += username;
        urlString += "/post";
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

    static postImage = (username, post, imageUrl) => {
        let urlString = USER_POST_API_URL;
        urlString += username;
        urlString += "/postImage";
        const params = new URLSearchParams();
        params.append("imageLink", imageUrl);
        return axios({
            method: "POST",
            url: urlString,
            headers: { "Content-Type": "application/json" },
            data: post,
            params: params
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

    static getFriends = (username) => {
        let urlString = USER_REST_API_URL;
        urlString += username;
        urlString += "/friends/";
        return axios.get(urlString);
    };

    static getFriendScroll = (username, page) => {
        let urlString = USER_REST_API_URL + username + "/friendsScroll";
        const params = new URLSearchParams();
        params.append("pageNumber", page);
        return axios({
            method: "GET",
            params: params,
            url: urlString,
        });
    };

    static friendsPost = (username, pageNumber) => {
        return axios({
            method: "GET",
            url: USER_FRIEND_POST_API_URL,
            params: { username: username, pageNumber: pageNumber },
        });
    };

    static userSearch = (keyword) => {
        let urlString = USER_REST_API_URL;
        urlString += keyword;
        urlString += "/search";

        return axios.get(urlString);
    };

    static sendFriendRequest = (username, friendUsername) => {
        const params = new URLSearchParams();
        params.append("friend", friendUsername);
        let urlString = USER_REST_API_URL + username + "/friendRequest/";
        return axios({
            method: "POST",
            url: urlString,
            params: { friend: friendUsername },
        });
    };

    static deleteFriendRequest = (username, friendUsername) => {
        const params = new URLSearchParams();
        params.append("friend", friendUsername);
        let urlString = USER_REST_API_URL + username + "/friendRequest";
        return axios({
            method: "DELETE",
            url: urlString,
            params: { friend: friendUsername },
        });
    };

    static myFriendRequest = (username) => {
        const urlString = USER_REST_API_URL + username + "/friendRequest";
        return axios.get(urlString);
    };

    static getMySentFriendRequest = (username) => {
        const urlString = USER_REST_API_URL + username + "/sentFriendRequest";
        return axios.get(urlString);
    };

    static acceptFriendRequest = (username, friendUsername) => {
        const params = new URLSearchParams();
        params.append("friend", friendUsername);
        let urlString = USER_REST_API_URL + username + "/friends/add";
        return axios({
            method: "POST",
            url: urlString,
            params: { friend: friendUsername },
        }).then(() => {
            window.location.reload(false);
        });
    };
}
