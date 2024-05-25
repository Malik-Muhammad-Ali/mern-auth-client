import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
        <h1>Home</h1>
        <Link to={'/register'}>New to website? Create Account</Link>
        <br />
        <Link to={'/login'}>Already have account? Login</Link>
    </>
  )
}

export default Home;