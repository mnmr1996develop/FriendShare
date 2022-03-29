import React, { Component } from "react";
import axios from "axios";

const USER_POST_API_URL = "http://localhost:8080/api/posts/";

export default class PostService extends Component {

    static getPostByID = (id) => {
        let urlString = USER_POST_API_URL + id
        return axios.get(urlString);
    }

    static getCommentsPaged = (id, page) => {
        let urlString = USER_POST_API_URL + id + "/post/commentsPaged";
        const params = new URLSearchParams();
        params.append("pageNumber", page)
        return axios({
            method: "GET",
            url: urlString,
            params: params
        })

    }

    static getAllComments = (id) => {
        let urlString = USER_POST_API_URL + id + "/post/getAllComments";
        return axios.get(urlString)

    }

    static deletePost = (username, id) => {
        let urlString = USER_POST_API_URL + username + "/posts/" + id
        return axios.delete(urlString)
    }

    static deleteComment = (username, commentId) => {
        let urlString = USER_POST_API_URL + username + "/comment/" + commentId
        return axios.delete(urlString)
    }


    static likePost = (username, postId) => {
        let urlString =
            USER_POST_API_URL + username + "/post/" + postId + "/like";
        return axios.post(urlString);
    };

    static likeComment = (username, postId) => {
        let urlString =
            USER_POST_API_URL + username + "/comment/" + postId + "/like";
        return axios.post(urlString);
    };

    static commentOnPost = (username, postId, comment) => {
        let urlString =
            USER_POST_API_URL + postId + "/comment/" + username
            return axios({
                method: "POST",
                url: urlString,
                headers: { "Content-Type": "application/json" },
                data: comment,
            })
                .then(() => {
                    window.location.reload(false);
                })
                .catch((e) => {
                    console.log(e);
                });
    };

    static unLikePost = (username, postId) => {
        let urlString =
            USER_POST_API_URL + username + "/post/" + postId + "/like";
        return axios.delete(urlString);
    };

    static unLikeComment = (username, postId) => {
        let urlString =
            USER_POST_API_URL + username + "/comment/" + postId + "/like";
        return axios.delete(urlString);
    };

    static getUserPost = (username) => {
        let urlString = USER_POST_API_URL + username + "/posts"
        return axios.get(urlString);
    }
}
