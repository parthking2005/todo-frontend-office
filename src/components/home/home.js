import React from 'react'
import "./home.css";
import Todos from "../todos/todos.js"
import Cookie from 'js-cookie';

function Home() {
  const hasRefreshCookie = document.cookie;

  let isHomePage = hasRefreshCookie.includes("refreshToken");
    if (isHomePage){
        return <Todos />
    }
  return (
    <div className='home'>
        Home
    </div>
  )
}

export default Home;
