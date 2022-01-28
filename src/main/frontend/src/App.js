import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Friends from './Components/Pages/Friends';
import Settings from './Components/Pages/Settings';
import Messages from './Components/Pages/Messages';
import Home from './Components/Pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Friends" element={<Friends />}></Route>
        <Route path="/Settings" element={<Settings />}></Route>
        <Route path="/Messages" element={<Messages />}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
