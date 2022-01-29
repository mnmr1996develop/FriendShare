import React from 'react';
import { useState } from 'react/cjs/react.development';
import UserService from '../Services/UserService';



function RegistrationForm() {


    const [fistName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [birthday, setBirthday] = useState("");
    
    
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

        console.log(info);
//        UserService.addUser(info);
    }

  return (
      <div className='RegistrationForm'>
          <form method='POST' onSubmit={() => onsubmit()}>
            First Name
            <input name='firstName' value={fistName} type="text" onChange={e => {setFirstName(e.target.value.trim().replace(/[^\w\s-]/gi, ""))}} />
            <br />
     
            Last Name
            <input name='lastName'  value={lastName} type="text" onChange={e => {setLastName(e.target.value.trim().replace(/[^\w\s-]/gi, ""))}} />
            <br />

            Email
            <input name='email'  value={email} type="text"onChange={e => {setEmail(e.target.value)}} />
            <br />

            Username
            <input name='username'  value={username} type="text" onChange={e => setUsername(e.target.value.trim().replace(/[^\w\s_-]/gi, ""))} />
            <br />

            Password
            <input id="password" name='password'  type="password" onChange={e => {setPassword(e.target.value); }}/>
            <br />

            Retype Password
            <input id="repassword" name='re-type password' type="password" onChange={e => {setRetypePassword(e.target.value)}}/>
            <br />

            <input type="date" value={birthday} name='birthday' onChange={e => setBirthday(e.target.value)} />
            </form>
            <div>

            </div>
      </div>
  );
}

export default RegistrationForm;
