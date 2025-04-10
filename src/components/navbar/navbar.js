import React, { useEffect, useState } from 'react';
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { deleteUserApiUrl } from '../../api/user';
import { firstDeleteTodo } from '../../helper/toaster';
import FormDialogFotUserUpdate from '../../helper/updateUser';
import Image from '../images/download.png'
import { getUser } from '../../customHooks/getUser';
import { useLogin } from '../../context/loginContext';
import DeleteUser from '../../helper/deleteUser';

function Navbar() {
  const [image, setImage] = useState(localStorage.getItem("profileimg") || Image)
  const [email, setEmail] = useState(localStorage.getItem("email"))
  const [username, setUsername] = useState(localStorage.getItem("username"))
  

  const {loginState, notLogin} =useLogin()


  useEffect(() => {
      setImage(localStorage.getItem("profileimg") || Image)
      setEmail(localStorage.getItem("email"))
      setUsername(localStorage.getItem("username"))
  }, [loginState])


  const getData = async (data) => {
    console.log("bro data in get data function so easy")
    console.log(data.data.data[0])
    const dataForUser = data.data.data[0];
    setImage(dataForUser.profileimg)
    setEmail(dataForUser.email)
    setUsername(dataForUser.username)
  }


  const hasRefreshCookie = document.cookie;
  let isHomePage = hasRefreshCookie.includes("refreshToken");
  console.log(isHomePage)
  const navigate = useNavigate();
  const handleNavigationSignup = () => {
    navigate('/signup');
  };
  const handleNavigationLogin = () => {
    navigate('/login');
  };

  const logout = () => {
    Cookies.remove("refreshToken")
    notLogin()
    localStorage.clear()
    navigate('/login')
  }

  const deleteUser = () => {
    deleteUserApiUrl().then((resp) => {
      if (resp.data.statusCode === 405) {
        return firstDeleteTodo()
      } else {
        Cookies.remove("refreshToken")
        localStorage.clear()
        notLogin()
        navigate('/signup')
      }
    }).catch((e) => {
      console.log(e)
    })

  }


  return (
    <header className='header'>
      <nav className="navbar">
        <NavLink to="/" className={({ isActive }) => `${isActive ? "active" : "deactive"}`}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => `${isActive ? "active" : "deactive"}`}>About</NavLink>
        <NavLink to="/services" className={({ isActive }) => `${isActive ? "active" : "deactive"}`}>Services</NavLink>
        <NavLink to="/contact" className={({ isActive }) => `${isActive ? "active" : "deactive"}`}>Contact</NavLink>
      </nav>

      <div className='search-bar'>
        <input type="text" placeholder='Search...' name="" id="searchIconInNav" />
        <button><i className='bx bx-search' ></i></button>
      </div>

      {!isHomePage ? <div className='auth-buttons'>
        <button className='signupbtn' onClick={handleNavigationSignup}>Sign Up</button>
        <button className='loginbtn' onClick={handleNavigationLogin}>Login</button>
      </div> :
        <div>
          <div className="dropdown-container">
            <img src={image} alt="user image" className='dropdown-btn' />
            <div className={`dropdown-menu`}>
              <button onClick={logout} className="dropdown-item">Logout</button>
              {/* <button onClick={deleteUser} className="dropdown-item">Delete User</button> */}
              <DeleteUser />
              <FormDialogFotUserUpdate getData={getData} image={image} username={username} email={email} />
            </div>
          </div>
        </div>
      }
    </header>
  )
}

export default Navbar
