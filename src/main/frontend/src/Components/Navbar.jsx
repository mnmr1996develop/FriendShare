import React, {useState}  from 'react';
import { NavLink } from 'react-router-dom';
import "../Resources/Styles/Components/Navbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faBars , faTimes, faSearch } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"

function Navbar() {
  library.add(faBars)

  const [click, setClick] = useState(false);

  var handleClick = () => setClick(!click);

  const[search, setSearch]= useState("");

  var onSubmit = ()=> {
    console.log(search);
  }


  return(
    <div>
        <nav className='navbar'>
          <div className='nav-container' >
            <div className='nav-logo'>
              <NavLink to ="/" className="nav-logo">
                FriendShare
              </NavLink>
            </div>
            <div className='search'>
              <div className='search-icon'>
              <i>
                <FontAwesomeIcon id="search-icon" icon={faSearch} className='fa-search'></FontAwesomeIcon>
              </i>
              </div>
              <form onSubmit={onSubmit}>
              <input id='nav-search' type="text" value={search} onChange={(e) => {setSearch(e.target.value)}}></input>
              </form>
            </div>
            <div className='menu'>
              <ul className="nav-menu">
                <li className="nav-item">
                  <NavLink to ="/" className="nav-links">
                  Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to ="/Friends" className="nav-links">
                    Friends 
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to ="/Messages" className="nav-links">
                  Messages
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to ="/Settings" className="nav-links">
                  Settings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to ="/SignIn" className="nav-links">
                  Sign In
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>

  )
}

export default Navbar;
