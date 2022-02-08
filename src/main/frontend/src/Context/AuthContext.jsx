import jwtDecode from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );
    const [isLoggedIn, setIsLoggedIn] = useState(() =>
        localStorage.getItem("authTokens") ? true : false
    );
    const [loginFail, setLoginFail] = useState(false);

    const history = useNavigate();

    let logout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        setLoginFail(false);
        setIsLoggedIn(false);
        history("/");
    };

    let loginUser = async (username, password) => {
        const params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        axios
            .post("http://localhost:8080/login", params)
            .then((res) => {
                setUser(jwtDecode(res.data.access_token).sub);
                setAuthToken(res.data);
                localStorage.setItem("authTokens", JSON.stringify(res.data));
                setIsLoggedIn(true);
            })
            .then(() => {
                history("/");
            })
            .catch((err) => {
                setLoginFail(true);
            });
    };

    let contextData = {
        isLoggedIn: isLoggedIn,
        logout: logout,
        loginFail: loginFail,
        user: user,
        loginUser: loginUser,
    };

    return (
        <AuthContext.Provider value={{ contextData }}>
            {children}
        </AuthContext.Provider>
    );
};
