import React, { useState } from 'react'
import './signup.css'
import { Link } from 'react-router-dom';
import Image from "../images/download.png"
import axios from 'axios';

function Signup() {

    const [isPasswordHidden, setIsPasswordHidden] = useState(true)
    const [isConfPasswordHidden, setIsConfPasswordHidden] = useState(true)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [profileImage, setProfileImage] = useState(Image)
    const changeStateOfPassword = () => {
        setIsPasswordHidden((prev) => !prev)
    }
    const changeStateOfConfirmPassword = () => {
        setIsConfPasswordHidden((prev) => !prev)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', username)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('file', profileImage)
            console.log(formData, "formData")
            const res = await axios.post('http://localhost:6001/api/v1/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const previewFile = async () => {
        let preview = document.getElementById('preview_img');
        let file    = document.getElementById('file').files[0];
        let reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
        }
      
        if (file) {
          reader.readAsDataURL(file);
          setProfileImage(reader.result)
        } else {
            preview.src = Image;
        }

    }
    // axios({
    //     method: 'post',
    //     url: 'http://localhost:6001/api/v1/user/register',
    //     data: {
    //       username: username,
    //       email: email,
    //       password: password,
    //       photo: document.querySelector('#fileInput').files
    //     }
    //   });



    return (
        <>
            <div className='wrapper-signup'>
                <span className="bg-animate2"></span>
                <div className="form-box register">
                    <h2>Sign Up</h2>
                    {/* action="http://localhost:6001/api/v1/user/register" target="_blank" */}
                    <form method='post' id='form-signup'>
                        <div className="input-box">
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="Username" id="Username" required />
                            <label htmlFor="Username">Username</label>
                            <i className='bx bxs-user' ></i>
                        </div>
                        <div className="input-box">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="Email" id="Email" required />
                            <label htmlFor="Email">Email</label>
                            <i className='bx bxs-envelope' ></i>
                        </div>
                        <div className="input-box">
                            <input type={isPasswordHidden ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name="Password" id="Password" required />
                            <label htmlFor="Password">Password</label>
                            <i className={isPasswordHidden ? "bi bi-eye-fill" : "bx bx-low-vision"} onClick={changeStateOfPassword}></i>

                        </div>
                        <div className="input-box">
                            <input type={isConfPasswordHidden ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="ConfirmPassword" id="ConfirmPassword" required />
                            <label htmlFor="ConfirmPassword">Confirm Password</label>
                            <i className={isConfPasswordHidden ? "bi bi-eye-fill" : "bx bx-low-vision"} onClick={changeStateOfConfirmPassword}></i>
                        </div>
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
        </>
    )
}

export default Signup
