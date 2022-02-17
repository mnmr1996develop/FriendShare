import React, { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import UserService from "../Services/UserService";
import "../Resources/Styles/Components/Post.css";

const PostComponent = () => {
    let {
        contextData: { user },
    } = useContext(AuthContext);
    let [post, setPost] = useState("");

    let addPost = (e) => {
        e.preventDefault();
        console.log(post.length);
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
                        onChange={(e) =>
                            setPost(e.target.value.replace(/[\r\n\v]+/g, ""))
                        }
                        maxLength="250"
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
