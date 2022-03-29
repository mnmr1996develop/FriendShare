import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import ErrorPage from "../Pages/ErrorPage";

function NotLoggedInRoutes() {
    return (
        <>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/" element={<Login />}></Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
}

export default NotLoggedInRoutes;
