import React from "react";
import Friends from "../Pages/Friends";
import Settings from "../Pages/Settings";
import Messages from "../Pages/Messages";
import Home from "../Pages/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Notifications from "../Pages/Notifications";
import ProfilePage from "./ProfilePage";

function LoggedInRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/friends" element={<Friends />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/notifications" element={<Notifications />}></Route>
        <Route path="/user/:username" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default LoggedInRoutes;
