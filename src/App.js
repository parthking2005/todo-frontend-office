import './App.css';
import Navbar from './components/navbar/navbar.js';
import { Outlet } from 'react-router-dom';
import { LoginProvider } from './context/loginContext.js';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const notLogin = () => {
    setIsLoggedIn(false)
  }

  const logined = () => {
    setIsLoggedIn(true)
  }

  const loginState = () => {
    return isLoggedIn
  }
  
  return (
    <>
      <LoginProvider value={{notLogin, logined, loginState}}>

        <div className="App">
          <div><Navbar /> <Outlet /></div>
        </div>
      </LoginProvider>
    </>
  );
}

export default App;






// import { useLogin } from '../context/loginContext';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// export const logout = () => {


//   }