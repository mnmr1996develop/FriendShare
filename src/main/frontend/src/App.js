import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { useContext, useState } from "react";
import LoggedInRoutes from "./Components/LoggedInRoutes";
import NotLoggedInRoutes from "./Components/NotLoggedInRoutes";
import AuthContext, { AuthProvider } from "./Context/AuthContext";
import RealRouter from "./Components/RealRouter";

function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <RealRouter />
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
