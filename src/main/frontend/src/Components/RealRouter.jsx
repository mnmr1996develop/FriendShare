import React from "react";
import LoggedInRoutes from "./LoggedInRoutes";
import NotLoggedInRoutes from "./NotLoggedInRoutes";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";

const RealRouter = () => {
    let {
        contextData: { isLoggedIn },
    } = useContext(AuthContext);
    return <>{isLoggedIn ? <LoggedInRoutes /> : <NotLoggedInRoutes />}</>;
};

export default RealRouter;
