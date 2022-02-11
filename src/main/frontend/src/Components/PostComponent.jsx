import React, { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import UserService from "../Services/UserService";
import "../Resources/Styles/Components/Post.css";
import TextareaAutosize from "react-textarea-autosize";

const PostComponent = () => {
    let {
        contextData: { user },
    } = useContext(AuthContext);
    let [post, setPost] = useState("");

    let addPost = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(user.sub));
        if (post.trim() !== "") {
            UserService.post(user.sub, post);
        }
    };

    return (
        <div className="postForm">
            <form onSubmit={addPost} className="formPost">
                <div className="postText">
                    <textarea
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        maxLength="200"
                    ></textarea>
                </div>
                <div id="postFormSubmit">
                    <button type="submit">Post</button>
                </div>
            </form>
        </div>
    );
};

export default PostComponent;
