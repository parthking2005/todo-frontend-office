import React from 'react';
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
function Navbar() {

    const navigate = useNavigate();
    const handleNavigationSignup = () => {
        navigate('/signup');
      };
    const handleNavigationLogin = () => {
        navigate('/login');
      };

  return (
    <header className='header'>
      <nav className="navbar">
        <NavLink to="/" className={({isActive}) => `${isActive ? "active" : "deactive"}`}>Home</NavLink>
        <NavLink to="/about" className={({isActive}) => `${isActive ? "active" : "deactive"}`}>About</NavLink>
        <NavLink to="/services" className={({isActive}) => `${isActive ? "active" : "deactive"}`}>Services</NavLink>
        <NavLink to="/contact" className={({isActive}) => `${isActive ? "active" : "deactive"}`}>Contact</NavLink>
      </nav>

      <div className='search-bar'>
        <input type="text" placeholder='Search...' name="" id="searchIconInNav" />
        <button><i className='bx bx-search' ></i></button>
      </div>

      <div className='auth-buttons'>
        <button className='signupbtn' onClick={handleNavigationSignup}>Sign Up</button>
        <button className='loginbtn' onClick={handleNavigationLogin}>Login</button>
      </div>
    </header>
  )
}

export default Navbar
