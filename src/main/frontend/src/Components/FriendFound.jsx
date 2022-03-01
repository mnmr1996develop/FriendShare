import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import UserService from "../Services/UserService";
import AuthContext from "../Context/AuthContext";

const FriendFound = ({ userFound, sentRequest }) => {
    let {
        contextData: { user },
    } = useContext(AuthContext);

    const [requestSent, setRequestSent] = useState(sentRequest);

    const sendFriendRequest = () => {
        UserService.sendFriendRequest(user.sub, userFound.username).then(() =>
            setRequestSent(true)
        );
    };

    const unFriendRequest = () => {
        UserService.deleteFriendRequest(user.sub, userFound.username).then(() =>
            setRequestSent(false)
        );
    };

    return (
        <div>
            <h1>{userFound.username}</h1>
            <h2>
                {userFound.firstName} {userFound.lastName}
            </h2>
            {requestSent ? (
                <button onClick={unFriendRequest}>Request sent</button>
            ) : (
                <button onClick={sendFriendRequest}>Send Friend Request</button>
            )}
        </div>
    );
};

export default FriendFound;
