import React from 'react';
import { useState} from 'react/cjs/react.development';
import '../Resources/Styles/Pages/Login.css'
import { useNavigate } from "react-router-dom";
import UserService from '../Services/UserService';





function Login() {



    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [badLogin, setBadLogin] = useState(false);

    const navigate = useNavigate();
  
    const routeChange = () =>{ 
        navigate('/Register')
    }

  
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        UserService.login(username, password).then(
          res => {
              console.log(res.data)
          }
      ).catch(
          function (error) {
              if (error.response) {
                console.log(error.response.data);

                if(error.response.data.reason == "BAD_LOGIN_DATA"){
                    setBadLogin(true)
                }
  
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log(error.config);
            }
              
      )
    }

  
  return (
      <div className='login-page'>
        <div className='login-element'>
          <div className='login-text'>
              <h1>
                FriendShare
              </h1>
              <h3>
                Connect with all of your friends and share your memories
              </h3>
          </div>
          <div className='login-functions'>
            {badLogin &&
              <div>
                <h1>Invalid</h1>
              </div>
            }
            <form className='login-inputs' onSubmit={handleSubmit}>
              <div className='login-input'>
                <input name='username'  value={username} type="text" onChange={e => setUsername(e.target.value.trim().replace(/[^\w_-]/gi, ""))} placeholder='Username'/>
              </div>


            <div className='login-input'>
            <input id="password" name='password'  type="password" value={password} onChange={e => {setPassword(e.target.value.trim()); }} placeholder='Password'/>
            </div>

            <div className='login-input'>
              <button>Login</button>
            </div>
            </form>
            <div className=''>
            <button onClick={routeChange}> Sign Up</button>
            </div>
            </div>
          </div>
      </div>
  );
}

export default Login;