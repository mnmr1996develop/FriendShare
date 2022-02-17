import React, { useEffect, useState } from "react";
import UserService from "../Services/UserService";

function Friends() {
    const [search, setSearch] = useState("");
    const [usersFound, setUsersFound] = useState([1, 2, 3]);
    const [myFriends, setMyFriends] = useState([]);

    var getSearchRequest = (item) => {
        return UserService.userSearch(item).then((res) => {
            return res.data;
        });
    };

    function compareUsers(user1, user2) {}

    useEffect(() => {}, []);

    useEffect(async () => {
        setUsersFound([]);
        if (!!search) {
            const stringArray = search.split(" ");
            let user = await getSearchRequest(stringArray[0]);
            setUsersFound(user);
        }
    }, [search]);

    return (
        <div className="Friends">
            <div id="findFriends">
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                ></input>
                {usersFound.map((items) => {
                    return <div>{items.username}</div>;
                })}
            </div>
            <div id="FriendsMyFriends"></div>
        </div>
    );
}

export default Friends;
