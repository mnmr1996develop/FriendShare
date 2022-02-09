import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import "../Resources/Styles/Pages/Login.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let {
        contextData: { loginFail },
    } = useContext(AuthContext);
    let {
        contextData: { loginUser },
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const routeChange = () => {
        navigate("/Register");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(username, password);
    };

    return (
        <div className="login-page">
            <div className="login-element">
                <div className="login-text">
                    <div>
                        <h1>FriendShare</h1>
                        <h3>
                            Connect with all of your friends and share your
                            memories with us as we definetly don't collect and
                            share all of your data for profits wink wink nudge
                            nudge
                        </h3>
                    </div>
                </div>
                <div className="login-functions">
                    {loginFail && (
                        <div className="failure">
                            <h1>Bad Username Or Password</h1>
                        </div>
                    )}
                    <div className="form">
                        <form className="login-inputs" onSubmit={handleSubmit}>
                            <div className="login-input">
                                <input
                                    name="username"
                                    value={username}
                                    type="text"
                                    onChange={(e) =>
                                        setUsername(
                                            e.target.value
                                                .trim()
                                                .replace(/[^\w_-]/gi, "")
                                        )
                                    }
                                    placeholder="Username"
                                />
                            </div>

                            <div className="login-input">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value.trim());
                                    }}
                                    placeholder="Password"
                                />
                            </div>

                            <div className="login-button">
                                <button>Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="signup-button">
                        <button onClick={routeChange}> Create an Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
