import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import UserService from "../Services/UserService";
import { usePasswordValidation } from "../Hooks/usePasswordValidation";
import "../Resources/Styles/Components/RegistrationForm.css";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

function RegistrationForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    let {contextData: {setLoginFail}} = useContext(AuthContext);

    const [validLength, hasNumber, upperCase, lowerCase, specialChar] =
        usePasswordValidation({
            password: password,
            requiredLength: 8,
        });

    const [userErrors, setUserErrors] = useState({});

    const [emailTaken, setEmailTaken] = useState(false);
    const [userTaken, setUserTaken] = useState(false);

    const navigate = useNavigate();

    const routeChange = () => {
        setLoginFail(false);
        navigate("/");
    };

    var passwordsMatch = () => {
        return password === retypePassword && password.length > 0
            ? true
            : false;
    };

    var validEmail = () => {
        {
            return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
        }
    };

    var passwordChecker = () => {
        return (
            validLength &&
            hasNumber &&
            upperCase &&
            lowerCase &&
            specialChar &&
            passwordsMatch()
        );
    };

    var correctAge = () => {
        var today = new Date();
        var birthDate = new Date(birthday);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= 13 && age < 130 ? true : false;
    };

    const getErrors = () => {
        let errors = {};
        if (!firstName.trim()) {
            errors.firstName = true;
        }
        if (!lastName.trim()) {
            errors.lastName = true;
        }
        if (!email.trim()) {
            errors.emailNull = true;
        }
        if (validEmail() === false) {
            errors.emailInvalid = true;
        }
        if (username.trim().length < 6) {
            errors.userName = true;
        }

        if (correctAge() === false) {
            errors.invalidAge = true;
        }

        if (passwordChecker() === false) {
            errors.invalidPassword = true;
        }

        if (Object.keys(errors).length === 0) {
            post();
            return;
        } else {
            return errors;
        }
    };

    const handleSubmit = (e) => {
        setEmailTaken(false);
        setUserTaken(false);
        e.preventDefault();
        setIsSubmitting(true);
        getErrors();
    };

    const post = () => {
        const enabled = true;
        const credentialsNonExpired = true;
        const accountNonExpired = true;
        const accountNonLocked = true;

        const payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password,
            enabled: enabled,
            birthday: birthday,
            credentialsNonExpired: credentialsNonExpired,
            accountNonExpired: accountNonExpired,
            accountNonLocked: accountNonLocked,
        };

        UserService.addUser(payload)
            .then((res) => {
                routeChange();
            })
            .catch(function (error) {
                if (error.response) {
                    console.log();
                    if (error.response.data.reason == "EMAIL_TAKEN") {
                        setEmailTaken(true);
                    } else if (error.response.data.reason == "USER_TAKEN") {
                        setUserTaken(true);
                    }
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };

    return (
        <div className="RegistrationForm">
            <form onSubmit={handleSubmit}>
                <div className="top-registration">
                    <div className="lettering">
                        <h1>Sign Up</h1>
                        <h4>it's Quick and easy.</h4>
                    </div>
                    <div className="close" onClick={routeChange}>
                        <i>
                            <FontAwesomeIcon
                                id="search-icon"
                                icon={faTimes}
                                className="fa-search"
                            ></FontAwesomeIcon>
                        </i>
                    </div>
                </div>
                <div className="input-holder">
                    <div className="input-box-half">
                        <input
                            name="firstName"
                            value={firstName}
                            type="text"
                            onChange={(e) => {
                                setFirstName(
                                    e.target.value
                                        .trim()
                                        .replace(/[^a-zA-Z-]/gi, "")
                                );
                            }}
                            placeholder="First Name"
                            required
                        />
                        <input
                            name="lastName"
                            value={lastName}
                            type="text"
                            onChange={(e) => {
                                setLastName(
                                    e.target.value
                                        .trim()
                                        .replace(/[^a-zA-Z-]/gi, "")
                                );
                            }}
                            placeholder="Last Name"
                            required
                        />
                    </div>

                    <div className="input-box">
                        <input
                            name="email"
                            value={email}
                            type="text"
                            onChange={(e) => {
                                setEmail(e.target.value.trim());
                            }}
                            placeholder="Email"
                            required
                        />
                        {emailTaken && (
                            <h6 style={{ color: "red" }}>Email Taken</h6>
                        )}
                    </div>

                    <div className="input-box">
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
                            required
                        />
                        {userTaken && (
                            <h6 style={{ color: "red" }}>Username Taken</h6>
                        )}
                    </div>

                    <div className="input-box">
                        <input
                            type="date"
                            value={birthday}
                            name="birthday"
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-box-half">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value.trim());
                            }}
                            placeholder="Password"
                            required
                        />
                        <input
                            id="repassword"
                            name="re-type password"
                            type="password"
                            value={retypePassword}
                            onChange={(e) => {
                                setRetypePassword(e.target.value.trim());
                            }}
                            placeholder="Retype Password"
                            required
                        />
                    </div>
                </div>
                <div className="registation-bottom">
                    <div className="Registration-Password">
                        <div className="password-checklist">
                            <h5>Password Length</h5>
                            <div className="password-yes-or-no">
                                <i>
                                    <FontAwesomeIcon
                                        id="search-icon"
                                        icon={validLength ? faCheck : faTimes}
                                        className="fa-search"
                                    ></FontAwesomeIcon>
                                </i>
                            </div>
                        </div>
                        <div className="password-checklist">
                            <h5> Has a Number</h5>
                            <div className="password-yes-or-no">
                                <i>
                                    <FontAwesomeIcon
                                        id="search-icon"
                                        icon={hasNumber ? faCheck : faTimes}
                                        className="fa-search"
                                    ></FontAwesomeIcon>
                                </i>
                            </div>
                        </div>
                        <div className="password-checklist">
                            <h5>Has Upper Case</h5>
                            <div className="password-yes-or-no">
                                <i>
                                    <FontAwesomeIcon
                                        id="search-icon"
                                        icon={upperCase ? faCheck : faTimes}
                                        className="fa-search"
                                    ></FontAwesomeIcon>
                                </i>
                            </div>
                        </div>
                        <div className="password-checklist">
                            <h5>Has Lower Case</h5>
                            <div className="password-yes-or-no">
                                <i>
                                    <FontAwesomeIcon
                                        id="search-icon"
                                        icon={lowerCase ? faCheck : faTimes}
                                        className="fa-search"
                                    ></FontAwesomeIcon>
                                </i>
                            </div>
                        </div>
                        <div className="password-checklist">
                            <h5>Has Special Character</h5>
                            <div className="password-yes-or-no">
                                <i>
                                    <FontAwesomeIcon
                                        id="search-icon"
                                        icon={specialChar ? faCheck : faTimes}
                                        className="fa-search"
                                    ></FontAwesomeIcon>
                                </i>
                            </div>
                        </div>
                        <div className="password-checklist">
                            <h5>passwords Match</h5>
                            <div className="password-yes-or-no">
                                <i>
                                    <FontAwesomeIcon
                                        id="search-icon"
                                        icon={
                                            passwordsMatch() ? faCheck : faTimes
                                        }
                                        className="fa-search"
                                    ></FontAwesomeIcon>
                                </i>
                            </div>
                        </div>
                        <div className="password-checklist">
                            <h5>Valid Email</h5>
                            <div className="password-yes-or-no">
                                <i>
                                    <FontAwesomeIcon
                                        id="search-icon"
                                        icon={validEmail() ? faCheck : faTimes}
                                        className="fa-search"
                                    ></FontAwesomeIcon>
                                </i>
                            </div>
                        </div>
                    </div>
                    <div className="registrationSubmit">
                        <button>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;
