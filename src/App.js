import './App.css';
import Navbar from './components/navbar/navbar.js';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="App">
        <div><Navbar /> <Outlet /></div>
      </div>
    </>
  );
}

export default App;
