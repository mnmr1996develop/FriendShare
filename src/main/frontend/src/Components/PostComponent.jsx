import React, { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import UserService from "../Services/UserService";
import "../Resources/Styles/Components/Post.css";

const PostComponent = () => {
    let {
        contextData: { user },
    } = useContext(AuthContext);

    let addPost = (e) => {
        if (e.key === "Enter" && post.length > 0) {
            if (checked) {
                const regex = new RegExp(".(jpg|jpeg|png|webp|avif|gif|svg)$");
                const regex2 = new RegExp("(http(s?):)([/|.|\w|\s|-])*\.")
                if (regex.test(linkToImage) && regex2.test(linkToImage)) {
                    UserService.postImage(user.sub, post, linkToImage.trim());
                    setValid(true);
                }   else{
                    setTried(true)
                   
                }
            } else {
                UserService.post(user.sub, post);
            }
        }
    };

    const [post, setPost] = useState("");
    const [linkToImage, setLinkToImage] = useState("");
    const [checked, setChecked] = useState(false);
    const [valid, setValid] = useState(false);
    const [tried, setTried] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
        setTried(false)
    };

    return (
        <div className="postForm">
            <textarea
                rows="1"
                placeholder={user.sub + ", What's on Your Mind"}
                maxLength="250"
                onKeyDown={addPost}
                value={post}
                onChange={(e) =>
                    setPost(e.target.value.replace(/[\r\n\v]+/g, ""))
                }
            />
            <div className="typeOfPost">
                
                <label>
                Link Image
                    <input
                        type="checkbox"
                        name="radio"
                        value={checked}
                        onChange={handleChange}
                    />
                </label>
                <div className="linkToImage">
                    {checked && (
                        <input
                            className={tried ? "fail" : "wow"}
                            value={linkToImage}
                            onChange={(e) => {
                                setLinkToImage(e.target.value.trim());
                            }}
                            onKeyDown={addPost}
                        />
                    )}
                    {tried&& checked && <h2 id="invalidLink">Invail Link</h2>}
                </div>
            </div>
        </div>
    );
};

export default PostComponent;
