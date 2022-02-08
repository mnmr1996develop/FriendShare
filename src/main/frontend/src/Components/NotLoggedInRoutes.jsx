import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

function NotLoggedInRoutes() {
    return (
        <>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/" element={<Login />}></Route>
            </Routes>
        </>
    );
}

export default NotLoggedInRoutes;
