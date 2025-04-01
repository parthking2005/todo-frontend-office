import React from 'react'
import "./home.css";
import Todos from "../todos/todos.js"

function Home() {
    let Signup = true;
    if (Signup){
        return <Todos />
    }
  return (
    <div className='home'>
        Home
    </div>
  )
}

export default Home;
