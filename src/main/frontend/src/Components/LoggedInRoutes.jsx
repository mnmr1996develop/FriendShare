import React from "react";
import Friends from "../Pages/Friends";
import Settings from "../Pages/Settings";
import Messages from "../Pages/Messages";
import Home from "../Pages/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Notifications from "../Pages/Notifications";
import ProfilePage from "../Pages/ProfilePage";
import Post from "../Pages/PostPage";
import '../Resources/Styles/Components/LoggedInRoutes.css'
import ErrorPage from "../Pages/ErrorPage";


function LoggedInRoutes() {
  return (
    <>
      <Navbar />
      <div className="NavBufferSpace"/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/friends" element={<Friends />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/notifications" element={<Notifications />}></Route>
        <Route path="/user/:username" element={<ProfilePage />} />
        <Route path="/post/:postId" element={<Post />}/>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/ErrorPage" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default LoggedInRoutes;
