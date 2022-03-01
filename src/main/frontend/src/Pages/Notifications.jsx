import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import UserService from "../Services/UserService";

const Notifications = () => {
    const [friendRequest, setFriendRequest] = useState([]);

    let {
        contextData: { user },
    } = useContext(AuthContext);

    useEffect(() => {
        UserService.myFriendRequest(user.sub).then((res) => {
            setFriendRequest(res.data);
        });
    }, []);

    const acceptFriendRequest = (username) => {
        UserService.acceptFriendRequest(user.sub, username)
    }

    return (
        <div>
            {friendRequest.map((item) => {
                return (
                    <div>
                        <h2>{item.username}</h2>
                        <button onClick={()=> {acceptFriendRequest(item.username)}}>accept request</button>
                    </div>
                );
            })}
        </div>
    );
};

export default Notifications;
