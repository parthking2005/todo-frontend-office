import React from 'react'
import './login.css'
import { Link } from 'react-router-dom';
import Image from "../images/download.png"

function Login() {

    // const wrapper = document.querySelector('.wrapper');
    // const loginLink = document.querySelector('.login-link');
    // const registerLink = document.querySelector('.register-link');
    // registerLink.onclick = () => {
    //     wrapper.classList.add('active');
    // } 

  return (
    <>
      <div className="wrapper">
        <span className="bg-animate"></span>
        <div className="form-box login">
            <h2 className='animation'>Login</h2>
                <form action="#">
                    <div className="input-box animation">
                        <input type="text" name="Username" id="Username" required />
                        <label htmlFor="Username">Username</label>
                        <i className='bx bxs-user' ></i>
                    </div>
                    <div className="input-box animation">
                        <input type="password" name="Password" id="Password" required />
                        <label htmlFor="Password">Password</label>
                        <i className='bx bxs-lock-alt' ></i>
                    </div>
                    <div className='forgot-password animation'>
                        <p>Forgot Password? <Link to="/resetpassword" className='reset-password'>Reset</Link></p>
                    </div>
                    <button type='submit' className="btn animation">Login</button>
                    <div className='logreg-link animation'>
                        <p>Don't have an account? <Link to="/signup" className='register-link'>Sign Up</Link></p>
                    </div>
                </form>
        </div>
        <div className="info-text login">
        <div id='userImgDiv'>
            <img id='preview_img' src={Image} alt="" />
            <input type="file" name="file" id="file" className="inputfile"/>
            <label htmlFor="file" form='form-signup'></label>
        </div>
            <h2>Welcome Back!</h2>
        </div>
      </div>
    </>
  )
}

export default Login
