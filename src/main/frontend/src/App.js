import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Friends from './Pages/Friends';
import Settings from './Pages/Settings';
import Messages from './Pages/Messages';
import Home from './Pages/Home';
import SignInForm from './Components/SignInForm';
import RegistrationForm from './Components/RegistrationForm';
import Register from './Pages/Register';
import Login from './Pages/Login'


function App() {
  return (
    <div className="App">
      <Router>
       <Navbar />
       <div className="Router"> 
      <Routes >
       
        <Route path="/" element={<Home />}></Route>
        <Route path="/friends" element={<Friends />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      
      </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
