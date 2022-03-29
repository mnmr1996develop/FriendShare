import React, { useContext, useState, useEffect } from "react";
import "../Resources/Styles/Components/CommentLayout.css";
import { faThumbsUp, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as thumb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../Context/AuthContext";
import PostService from "../Services/PostService";
import { useNavigate } from "react-router-dom";

const CommentLayout = ({
    commentOwner,
    commentText,
    commentId,
    likes,
    time,
}) => {
    let {
        contextData: { user },
    } = useContext(AuthContext);

    const [likedComment, setLikedComment] = useState(false);
    const [likeCounter, setLikeCounter] = useState(likes.length);

    let navigate = useNavigate();

    const goToProfile = () => {
        navigate("/user/" + commentOwner.username);
    };

    const convertDate = () => {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        var t = time.split(/[-T:]/);

        var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        var currentDateTime = new Date(Date.now());

        if (
            currentDateTime.getFullYear() - d.getFullYear() == 0 &&
            currentDateTime.getMonth() - d.getMonth() == 0 &&
            currentDateTime.getDate() - d.getDate() <= 1
        ) {
            if (currentDateTime.getDate() - d.getDate() == 1) {
                return <>yesteday</>;
            } else if (currentDateTime.getHours() - d.getHours() > 1) {
                return (
                    <>{currentDateTime.getHours() - d.getHours()} Hours Ago</>
                );
            } else if (currentDateTime.getHours() - d.getHours() == 1) {
                return (
                    <>{currentDateTime.getHours() - d.getHours()} Hour Ago</>
                );
            } else if (currentDateTime.getMinutes() - d.getMinutes() > 0) {
                return (
                    <>
                        {currentDateTime.getMinutes() - d.getMinutes()} Minutes
                        Ago
                    </>
                );
            } else {
                return <>Now</>;
            }
        } else {
            return (
                <>
                    {monthNames[d.getMonth()]} {t[2]} {d.getFullYear()}{" "}
                    {d.getHours() % 12}:{d.getMinutes()}{" "}
                    {d.getHours < 12 ? "AM" : "PM"}
                </>
            );
        }
    };

    const deleteComment = () => {
        PostService.deleteComment(user.sub, commentId).then(() => {
            window.location.reload(false);
        });
    };

    const toggleLike = () => {
        if (likedComment == false) {
            PostService.likeComment(user.sub, commentId).then((res) => {
                setLikedComment(true);
                setLikeCounter(res.data.likes.length);
            });
        } else {
            PostService.unLikeComment(user.sub, commentId).then((res) => {
                setLikedComment(false);
                setLikeCounter(res.data.likes.length);
            });
        }
    };

    useEffect(() => {
        if (likes) {
            setLikeCounter(likes.length);
            for (let i = 0; i < likes.length; i++) {
                if (likes[i].username === user.sub) {
                    setLikedComment(true);
                }
            }
        }
    }, []);



    return (
        <div className="TotalComment">
            <div className="CommentLayout">
                <div className="topOfComment">
                    <div className="commentOwnerName">
                        <h4 onClick={goToProfile}>
                            {commentOwner.firstName} {commentOwner.lastName}
                        </h4>
                    </div>

                    {commentOwner.username == user.sub && (
                        <div className="deleteButton" onClick={deleteComment}>
                            <i>
                                <FontAwesomeIcon
                                    id="search-icon"
                                    icon={faTrashCan}
                                    className="fa-search"
                                ></FontAwesomeIcon>
                            </i>
                            Delete
                        </div>
                    )}
                </div>
                <div className="commentExtraInfo">
                    <div className="commentUsername">
                        <h4 onClick={goToProfile}>{commentOwner.username}</h4>
                    </div>
                    <div>
                        <h6>{convertDate()}</h6>
                    </div>
                </div>
                <div className="commentText">
                    <p>{commentText}</p>
                </div>
            </div>
            <div className="commentActions">
                <div className={!likedComment ?  "noLikedComment"  :"CommentLike"} onClick={toggleLike}>
                    <i>
                        <FontAwesomeIcon
                            id="search-icon"
                            icon={likedComment ? thumb : faThumbsUp}
                            className="fa-search"
                        ></FontAwesomeIcon>
                    </i>
                    {likeCounter} likes
                </div>
            </div>
        </div>
    );
};

export default CommentLayout;
