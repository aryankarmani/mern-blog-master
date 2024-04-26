import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import './Header.css' ;
import {CiPen} from "react-icons/ci" ;
import {BiLogOut} from "react-icons/bi"

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }
  const username = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo"><img src="https://www.juit.ac.in/front/images/logo.jpg" alt="JUIT"/> <span>JUIT Blogs</span></Link>
      <nav>
        {username && (
          <>
            <Link style={{ border:"1px solid black" }} to="/create"><CiPen size={50}/>Write</Link>
            <a onClick={logout}><BiLogOut size={50}/>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
