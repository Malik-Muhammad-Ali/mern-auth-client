import React from 'react';
import { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e)=>{
        e.preventDefault();

        const response = await fetch('https://deploy-mern-ali/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json();

        if(data.token){
            localStorage.setItem('token', data.token);
            alert('Login Success');
            window.location.href = '/dashboard';
        }else{
            alert('Login Failed');
        }
    }

  return (
    <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input type="email" placeholder='Enter Email' onChange={(e)=> setEmail(e.target.value)} />
            <br />
            <input type="password" placeholder='Enter Password' onChange={(e)=> setPassword(e.target.value)} />
            <br />
            <button type='submit'>Login</button>
        </form>
    </>
  )
}

export default Login;
