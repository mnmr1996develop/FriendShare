import React, { Component } from "react";
import axios from "axios";

const USER_POST_API_URL = "http://localhost:8080/api/posts/";

export default class PostService extends Component {

    static getPostByID = (id) => {
        let urlString = USER_POST_API_URL + id
        return axios.get(urlString)
    }

    static likePost = (username, postId) => {
        let urlString =
            USER_POST_API_URL + username + "/post/" + postId + "/like";
        return axios.post(urlString);
    };

    static unLikePost = (username, postId) => {
        let urlString =
            USER_POST_API_URL + username + "/post/" + postId + "/like";
        return axios.delete(urlString);
    };
}
