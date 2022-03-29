import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Resources/Styles/Components/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import AuthContext from "../Context/AuthContext";
import UserService from "../Services/UserService";

function Navbar() {
    library.add(faBars);

    const [navClick, setNavClick] = useState(false);
    const [path, setPath] = useState("");

    var handleNavClick = () => setNavClick(!navClick);

    const navClicked = () => {
        setNavClick(false);
    };

    const [search, setSearch] = useState("");

    var getSearchRequest = (item) => {
        return UserService.userSearch(item).then((res) => {
            return res.data;
        });
    };

    useEffect(() => {
        let string  = "user/" + user.sub
        setPath(string)
    },[])

    var onSubmit = async (e) => {
        e.preventDefault();
    };

    let {
        contextData: { logout, user },
    } = useContext(AuthContext);

    return (
        <div>
            <nav className="navbar">
                <div className="nav-container">
                    <div className="always-there">
                        <div className="nav-logo-container">
                            <NavLink to="/" className="nav-logo">
                                FriendShare
                            </NavLink>
                        </div>
                        <div className="search">
                            <div className="search-icon">
                                {/* <i>
                                    <FontAwesomeIcon
                                        id="search-icon"
                                        icon={faSearch}
                                        className="fa-search"
                                    ></FontAwesomeIcon>
                                </i> */}
                            </div>
                            <form onSubmit={onSubmit}>
                                <input
                                    id="nav-search"
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value.trim());
                                    }}
                                    placeholder="search username"
                                ></input>
                            </form>
                        </div>

                        <div onClick={handleNavClick} className="menu-pop">
                            <i>
                                <FontAwesomeIcon
                                    id="search-icon"
                                    icon={navClick ? faTimes : faBars}
                                    className="fa-search"
                                ></FontAwesomeIcon>
                            </i>
                        </div>
                    </div>

                    <div className={navClick ? "menu" : "menu-condensed"}>
                        <ul className="nav-menu">
                            <li className="nav-item">
                                <NavLink
                                    onClick={navClicked}
                                    to="/"
                                    className="nav-links"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    onClick={navClicked}
                                    to={path}
                                    className="nav-links"
                                >
                                    {user.sub}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    onClick={navClicked}
                                    to="/Friends"
                                    className="nav-links"
                                >
                                    Friends
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    onClick={navClicked}
                                    to="/Notifications"
                                    className="nav-links"
                                >
                                    Notifications
                                </NavLink>
                            </li>
                            <li className="nav-item" id="signout">
                                <div className="nav-links" onClick={logout}>
                                    Sign Out
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
