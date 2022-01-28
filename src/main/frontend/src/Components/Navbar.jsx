import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"

function Navbar() {
  return(
    <div>
      <nav className='navbar'>
        <div className='nav-container'>
          
                <NavLink exact to ="/" className="nav-logo">FriendShare</NavLink>
          

        <div className='nav-menu'>
          <ul>
            <li className='nav-item'> <NavLink exact to ="/" className="nav-links">Home</NavLink> </li>
            <li className='nav-item'><NavLink exact to ="/Friends" className="nav-links">Friends</NavLink></li>
            <li className='nav-item'><NavLink exact to ="/Messages" className="nav-links">Messages</NavLink></li>
            <li className='nav-item'><NavLink exact to ="/Settings" className="nav-links">Settings</NavLink></li>
          </ul>
        </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
