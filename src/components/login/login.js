import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import Image from "../images/2678153.jpg"
import Cookie from 'js-cookie'
import { loginUserApiUrl } from '../../api/user';
import { userNotExist, wrongPassword } from '../../helper/toaster';
import { ToastContainer } from 'react-toastify';
import { useLogin } from '../../context/loginContext';


function Login() {
    
    const [usernameOrEmail, setUsernameOrEmail] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")

    const [emptypassword, setEmptypassword] = useState(false)
    const [emptyUsernameOrEmail, setEmptyUsernameOrEmail] = useState(false)
    const [passwordLength, setPasswordLength] = useState(false)
    const [isUsernameHasSpace, setIsUsernameHasSpace] = useState(false)
    const [isPasswordHasSpace, setIsPasswordHasSpace] = useState(false)

      const {logined} =useLogin()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmptyUsernameOrEmail(false)
        setEmptypassword(false)
        setPasswordLength(false)
        setIsPasswordHasSpace(false)
        setIsUsernameHasSpace(false)


        if (usernameOrEmail.includes(" ")) {
          return setIsUsernameHasSpace(true)
        }
        if (passwordLogin.includes(" ")) {
          return setIsPasswordHasSpace(true)
        }
      if (!usernameOrEmail || usernameOrEmail === ""){
          return setEmptyUsernameOrEmail(true)
      } 
    
      if (!passwordLogin || passwordLogin === ""){
          setEmptypassword(false)
          return setEmptypassword(true)
      } else{
          if (passwordLogin.length < 8){
              return setPasswordLength(true)
          } 
      }


        try {

            const data = {
              entereduser: usernameOrEmail.trim(),
              password: passwordLogin.trim()
            }
            loginUserApiUrl(data)
              .then(function (response) {
                if (response.data.statusCode === 404) {
                  userNotExist()
                }else if(response.data.statusCode === 402){
                  wrongPassword()
                }else{
                  Cookie.set("refreshToken", response.data.data.generatedJwt)
                  localStorage.setItem("email", response.data.data.isUserFound.email)
                  localStorage.setItem("username", response.data.data.isUserFound.username)
                  localStorage.setItem("profileimg", response.data.data.isUserFound.profileimg)
                  logined()
                  navigate("/")
                }
                console.log(response)
              })
              .catch(function (error) {
                console.log(error);
              });


        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
      <div className="wrapper">
        <span className="bg-animate"></span>
        <div className="form-box login">
            <h2 className='animation'>Login</h2>
                <form action="#">
                    <div className="input-box animation">
                        <input value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} type="text" name="Username" id="Username" required />
                        <label htmlFor="Username">Username or Email</label>
                        <i className='bx bxs-user' ></i>
                    </div>
                    {emptyUsernameOrEmail ? "enter email or username" : ""}
                    {isUsernameHasSpace ? "space is not allowed bro" : ""}
                    <div className="input-box animation">
                        <input value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} type="password" name="Password" id="Password" required />
                        <label htmlFor="Password">Password</label>
                        <i className='bx bxs-lock-alt' ></i>
                    </div>
                    {emptypassword ? "enter password" : ""}
                    {passwordLength ? "password length is less than 8" : ""}
                    {isPasswordHasSpace ? "space is not allowed bro" : ""}
                    <div className='forgot-password animation'>
                        <p>Forgot Password? <Link to="/resetpassword" className='reset-password'>Reset</Link></p>
                    </div>
                    <button type='submit' onClick={handleSubmit} className="btn animation">Login</button>
                    <div className='logreg-link animation'>
                        <p>Don't have an account? <Link to="/signup" className='register-link'>Sign Up</Link></p>
                    </div>
                </form>
        </div>
        <div className="info-text login">
        <div id='userImgDiv2'>
            <img id='preview_img' className='image-login' src={Image} alt="" />
        </div>
            <h2>Welcome Back!</h2>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
