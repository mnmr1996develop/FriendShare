import React from 'react';
import { useState } from 'react/cjs/react.development';
import UserService from '../Services/UserService';
import { usePasswordValidation } from '../Hooks/usePasswordValidation';
import '../Resources/Styles/Components/RegistrationForm.css';
import {  faTimes , faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";


function RegistrationForm() {


    const [fistName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [birthday, setBirthday] = useState("");
    const [
            validLength,
            hasNumber,
            upperCase,
            lowerCase,
            specialChar,
    ] = usePasswordValidation
    (
        {
                password: password,
                requiredLength: 8
        }
    );
    

    const history = useNavigate();
  
    const routeChange = () =>{ 
        let path = "/"; 
        history.push(path);
    }

    var passwordsMatch = () => {
        return password === retypePassword ? true : false;
    }

    var validEmail = () => {{
        return (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))
    }}

    var passwordChecker =() => {
        return validLength && hasNumber && upperCase && lowerCase && specialChar;
    }

    var correctAge = () => {
        var today = new Date();
        var birthDate = new Date(birthday);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
            age--;
        }

        return age >= 13 && age < 130 ? true : false;
    }


    var failedSubmit = false;
    
    const onsubmit = () =>{
        const enabled = true;
        const credentialsNonExpired = true;
        const accountNonExpired = true;
        const accountNonLocked = true;

        const info = 
        {
            fistName, 
            lastName,
            email,
            username,
            password,
            enabled,
            birthday,
            credentialsNonExpired,
            accountNonExpired,
            accountNonLocked
        }

        if(
            passwordsMatch() &&
            validEmail() &&
            correctAge()

        ){

        }
        else{
            failedSubmit = true;
        }
    }

  return (
      <div className='RegistrationForm'>
          <form>
            <div className='top'>
                <div className='lettering'>
                    <h1>Sign Up</h1>
                    <h4>it's Quick and easy.</h4>
                </div>
                <div className='close'>
                <i>
                <FontAwesomeIcon id="search-icon" icon={faTimes} className='fa-search'></FontAwesomeIcon>
              </i>
                </div>
            </div>
            <div className='input-box-half'>
                <input name='firstName' value={fistName} type="text" onChange={e => {setFirstName(e.target.value.trim().replace(/[^\w\s-]/gi, ""))}} placeholder='First Name' />
                <input name='lastName'  value={lastName} type="text" onChange={e => {setLastName(e.target.value.trim().replace(/[^\w\s-]/gi, ""))}} placeholder='Last Name'/>
            </div>
        

            <div className='input-box'>
                <input name='email'  value={email} type="text"onChange={e => {setEmail(e.target.value)}} placeholder='Email'/>
            </div>

            <div className='input-box'>
            <input name='username'  value={username} type="text" onChange={e => setUsername(e.target.value.trim().replace(/[^\w\s_-]/gi, ""))} placeholder='Username'/>
            </div>

            <div className='input-box'>
            <input type="date" value={birthday} name='birthday' onChange={e => setBirthday(e.target.value)} />
            </div>

            <div className='input-box-half'>
            <input id="password" name='password'  type="password" onChange={e => {setPassword(e.target.value); }} placeholder='Password'/>
            <input id="repassword" name='re-type password' type="password" value={retypePassword} onChange={e => {setRetypePassword(e.target.value)}} placeholder='Retype Password'/>
            </div>

           
            <br />

            <div className='Registration-Password'>
                <div className='password-checklist'>
                    <h5>Password Length</h5>
                    <div className='password-yes-or-no'>
                        <i>
                            <FontAwesomeIcon id="search-icon" icon={validLength ? faCheck : faTimes} className='fa-search'></FontAwesomeIcon>
                        </i>
                    </div>
                </div>
                <div className='password-checklist'>
                    <h5> Has a Number</h5>
                    <div className='password-yes-or-no'>
                        <i>
                            <FontAwesomeIcon id="search-icon" icon={hasNumber ? faCheck : faTimes} className='fa-search'></FontAwesomeIcon>
                        </i>
                    </div>
                </div>
                <div className='password-checklist'>
                    <h5>Has Upper Case</h5>
                    <div className='password-yes-or-no'>
                         <i>
                            <FontAwesomeIcon id="search-icon" icon={upperCase ? faCheck : faTimes} className='fa-search'></FontAwesomeIcon>
                        </i>
                    </div>
                </div>
                <div className='password-checklist'>
                    <h5>Has Lower Case</h5>
                    <div className='password-yes-or-no'>
                         <i>
                            <FontAwesomeIcon id="search-icon" icon={lowerCase ? faCheck : faTimes} className='fa-search'></FontAwesomeIcon>
                        </i>
                    </div>
                </div>
                <div className='password-checklist'>
                    <h5>Has Special Character</h5>
                    <div className='password-yes-or-no'>
                         <i>
                            <FontAwesomeIcon id="search-icon" icon={specialChar ? faCheck : faTimes} className='fa-search'></FontAwesomeIcon>
                        </i>
                    </div>
                </div>
                <div className='password-checklist'>
                    <h5>passwords Match</h5>
                    <div className='password-yes-or-no'>
                         <i>
                            <FontAwesomeIcon id="search-icon" icon={passwordsMatch() ? faCheck : faTimes} className='fa-search'></FontAwesomeIcon>
                        </i>
                    </div> 
                </div>
                <div className='password-checklist'>
                    <h5>Valid Email</h5>
                    <div className='password-yes-or-no'>
                         <i>
                            <FontAwesomeIcon id="search-icon" icon={validEmail() ? faCheck : faTimes} className='fa-search'></FontAwesomeIcon>
                        </i>
                    </div> 
                </div>
            </div>

            <div>

            {failedSubmit &&
                <div> 
                    <h2>something went wrong</h2>
                </div>
            }

             
            </div>

            <div className='registrationSubmit'>
                <button  onSubmit={() => onsubmit()}>Submit</button>
            </div>
        </form>
      </div>
  );
}

export default RegistrationForm;
