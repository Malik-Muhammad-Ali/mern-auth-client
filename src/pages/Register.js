import React from 'react';
import { useState } from 'react';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e)=>{
        e.preventDefault();

        const response = await fetch('https://deploy-mern-ali/api/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })

        if(response.status === 200){
            alert('Register Success');
        }
    }

  return (
    <>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <input type="text" placeholder='Enter Name' onChange={(e)=> setName(e.target.value)} />
            <br />
            <input type="email" placeholder='Enter Email' onChange={(e)=> setEmail(e.target.value)} />
            <br />
            <input type="password" placeholder='Enter Password' onChange={(e)=> setPassword(e.target.value)} />
            <br />
            <button type='submit'>Register</button>
        </form>
    </>
  )
}

export default Register;
