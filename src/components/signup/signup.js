import React, { useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom';
import Image from "../images/download.png";
import { toast, ToastContainer } from 'react-toastify';
import {
    usernameNotEntered, 
    emailNotEntered,
    passwordNotEntered,
    passwordIsNotSame,
    passwordLengthIsLessThanEight,
    usernameAndEmailIsAlreadyExist,
    notValidEmail,
    notValidEmailBySymbols,
    notValidUsernameBySymbols,
} from '../../helper/toaster.js';
import { registerUserApiUrl } from '../../api/user/index.js';


function Signup() {

    const [isPasswordHidden, setIsPasswordHidden] = useState(false)
    const [isConfPasswordHidden, setIsConfPasswordHidden] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [profileImage, setProfileImage] = useState(null)

    const [usernameFilled, setUsernameFilled] = useState(false)
    const [emailFilled, setEmailFilled] = useState(false)
    const [passwordFilled, setPasswordFilled] = useState(false)
    const [passwordLength, setPasswordLength] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)
        const [isUsernameHasSpace, setIsUsernameHasSpace] = useState(false)
        const [isPasswordHasSpace, setIsPasswordHasSpace] = useState(false)
        const [isEmailHasSpace, setIsEmailHasSpace] = useState(false)
        const [isEmailIsPerfect, setIsEmailIsPerfect] = useState(false)







    const changeStateOfPassword = () => {
        setIsPasswordHidden((prev) => !prev)
    }
    const changeStateOfConfirmPassword = () => {
        setIsConfPasswordHidden((prev) => !prev)
    }
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameFilled(false)
        setPasswordMatch(false)
        setEmailFilled(false)
        setPasswordFilled(false)
        setPasswordLength(false)
        setIsPasswordHasSpace(false)
        setIsUsernameHasSpace(false)
        setIsEmailHasSpace(false)
        setIsEmailIsPerfect(false)

        // const handleSubmitUrlForRegister = await registerUserApiUrl()

        if (username.includes(" ")) {
            return setIsUsernameHasSpace(true)
          }
          if (email.includes(" ")) {
            return setIsEmailHasSpace(true)
          }
          if (!email.includes("@" || !email.includes("."))) {
            return setIsEmailIsPerfect(true)
          }
          if (password.includes(" ")) {
            return setIsPasswordHasSpace(true)
          }

        if (!username || username === ""){
            return setUsernameFilled(true)
        }

        if (!email || email === ""){
            return setEmailFilled(true)
        } 

        if (!password || password === ""){
            setPasswordFilled(false)
            return setPasswordFilled(true)
        } else{
            if (password.length < 8){
                return setPasswordLength(true)
            } 
        } 



        if (password !== confirmPassword){
            return setPasswordMatch(true)
        }


        try {
            const formData = new FormData();
            formData.append('username', username.trim())
            formData.append('email', email.trim())
            formData.append('password', password.trim())
            formData.append('profile', profileImage)
            const res = await registerUserApiUrl(formData);
            if(res.data.statusCode === 200){
                navigate("/login");
            }else if(res.data.statusCode === 422){
                return usernameAndEmailIsAlreadyExist()
            }else if(res.data.statusCode === 409){
                return notValidEmail()
            }else if(res.data.statusCode === 401 && res.data.message === "user not entered username"){
                return usernameNotEntered()
            }else if(res.data.statusCode === 401 && res.data.message === "email is not entered"){
                return emailNotEntered()
            }else if(res.data.statusCode === 401 && res.data.message === "password is not entered"){
                return passwordNotEntered()
            }else if(res.data.statusCode === 400 && res.data.message === "email is not valid only numbers, alphabets, dot(.) and @"){
                return notValidEmailBySymbols()
            }else if(res.data.statusCode === 400 && res.data.message === "username is not valid only numbers, alphabets and underscore(_) is valid"){
                return notValidUsernameBySymbols()
            }else if(res.data.statusCode === 403){
                return toast.warn(res.data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }


    const previewFile = async () => {
        let preview = document.getElementById('preview_img');
        let file = document.getElementById('file').files[0];
        let reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
            setProfileImage(file)
        } else {
            preview.src = Image;
            setProfileImage(null)
        }

    }





    return (
        <>
            <div className='wrapper-signup'>
                <span className="bg-animate2"></span>
                <div className="form-box register">
                    <h2>Sign Up</h2>
                    <form method='post' id='form-signup' autoComplete='off'>
                        <div className="input-box">
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="Username" id="Username" required />
                            <label htmlFor="Username">Username</label>
                            <i className='bx bxs-user' ></i>
                        </div>
                        {usernameFilled ? "username is required" : ""}
                        {isUsernameHasSpace ? "space is not allowed bro" : ""}
                        <div className="input-box">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="Email" id="Email" required />
                            <label htmlFor="Email">Email</label>
                            <i className='bx bxs-envelope' ></i>
                        </div>
                        {isEmailHasSpace ? "space is not allowed bro" : ""}
                        {emailFilled ? "email is required" : ""}
                        {isEmailIsPerfect ? "email should have @ and ." : ""}
                        <div className="input-box">
                            <input type={isPasswordHidden ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name="Password" id="Password" required />
                            <label htmlFor="Password">Password</label>
                            <i className={isPasswordHidden ? "bx bx-low-vision" : "bi bi-eye-fill"} onClick={changeStateOfPassword}></i>

                        </div>
                        {passwordFilled ? "password is required" : ""}
                        {passwordLength ? "password Length is less than 8" : ""}
                        {isPasswordHasSpace ? "space is not allowed bro" : ""}
                        <div className="input-box">
                            <input type={isConfPasswordHidden ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="ConfirmPassword" id="ConfirmPassword" required />
                            <label htmlFor="ConfirmPassword">Confirm Password</label>
                            <i className={isConfPasswordHidden ? "bx bx-low-vision" : "bi bi-eye-fill" } onClick={changeStateOfConfirmPassword}></i>
                        </div>
                        {passwordMatch ? "password is not match" : ""}
                        <button type='submit' onClick={handleSubmit} className="btn">Sign Up</button>
                        <div className='logreg-link'>
                            <p>Already have an account? <Link to="/login" className='login-link'>Login</Link></p>
                        </div>
                    </form>


                </div>

                <div className="info-text register">
                    <div id='userImgDiv' className="signUpPageImage">
                        <img className="signUpPageImage" id='preview_img' src={Image} alt="" />
                        <input type="file" name="file" id="file" className="inputfile" onChange={previewFile} />
                        <label htmlFor="file" form='form-signup'></label>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Signup
