import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Dashboard = (req, res) => {

  const [user, setUser] = useState({});
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  const populateQuote = async () => {
    const response = await fetch("https://deploy-mern-ali/api/quote", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setQuote(data.quote);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      if (!user) {
        localStorage.removeItem("token");
      } else {
        populateQuote();
      }
    }
  }, []);

  const handleUpdateQuote = async (e)=>{
    e.preventDefault();

    const response = await fetch('https://deploy-mern-ali/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({quote: tempQuote})
    });

    const data = await response.json();
    if(data.status === 200){
      setTempQuote("");
      setQuote(data.quote);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  // if(!localStorage.getItem('token')){
  //   return <Navigate to='/login' replace />
  // }

  return (
    <>
      <h1>Dashboard</h1>
      <h3>Welcome, {user.name}</h3>
      <p>Your Quote is: {quote ? quote : "No Quote"}</p>
      <form action="">
        <input
          type="text"
          placeholder="Enter Quote"
          onChange={(e) => setTempQuote(e.target.value)}
          value={tempQuote}
        />
        <button onClick={handleUpdateQuote}>Update Quote</button>
      </form>

      <button onClick={logout}>Logout</button>

    </>
  );
};

export default Dashboard;
