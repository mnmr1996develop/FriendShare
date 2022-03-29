import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import PostService from "../Services/PostService";
import UserService from "../Services/UserService";
import PostLayout from "../Components/PostLayout";
import "../Resources/Styles/Components/ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
    let { username } = useParams();
    let {
        contextData: { user },
    } = useContext(AuthContext);
    const [userProfileDetails, setUserProfileDetails] = useState([]);
    const [userPost, setUserPost] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const [isMyProfile, setIsMyProfile] = useState(false);

    let navigate = useNavigate()


    const settings = () => {

        
        return (
            <div className="edit-profile">
                <h3>Edit profile</h3>
                <i className="profile-icon">
                    <FontAwesomeIcon
                        id="user-gear-icon"
                        icon={faUserCog}
                        className="fa-search"
                    ></FontAwesomeIcon>
                </i>
            </div>
        );
    };

    useEffect(() => {
        if (username === user.sub) {
            setIsMyProfile(true);
        }

        UserService.getUser(username)
            .then((res) => {
                setUserProfileDetails(res.data);
            })
            .catch(() => {
                navigate("/ErrorPage")
            });

        PostService.getUserPost(username).then((res) => {
            setUserPost(res.data);
        });

        UserService.getFriends(username).then((res) => {
            setUserFriends(res.data);
        });
    }, []);

    return (
        <div className="userProfile">
            <div className="top">
                <div className="user-profile">
                    <h1>{userProfileDetails.username}</h1>
                    {isMyProfile ? settings() : <> no</>}
                </div>
                <h2>
                    {userProfileDetails.firstName} {userProfileDetails.lastName}
                </h2>

                <h3>{userProfileDetails.birthday}</h3>
                <h3>
                    Friends :{userFriends.length} Post: {userPost.length}{" "}
                </h3>
            </div>

            <div className="post">
                <div className="post-body">
                    {userPost.map((post) => {
                        return (
                            <PostLayout
                            postId={post.id}
                            postOwner={post.user}
                            key={post.id}
                            status={post.status}
                            time={post.localDateTime}
                            likes={post.likes}
                            numberOfComments={post.numberOfComments}
                            photo={post.imageLink}
                        />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
