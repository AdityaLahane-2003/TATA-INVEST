import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase/config.js';
import './navbar.css';
import { removeCookie } from '../../utils/cookies.js';
import { Button } from '@mui/material';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp.js';

function Navbar() {
  const [authenticated, setAuthenticated] = useState(false);
  const history = useNavigate();
  const userId = localStorage.getItem('userId');
   
  useEffect(() => {
     setAuthenticated(userId !== null && userId !== undefined);
  }, [userId]);
  

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setAuthenticated(false);
        removeCookie("loggedIn");
        localStorage.removeItem('userId');
        history('/');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };

  return (
      <div className="container custom-bg-color mt-0 mb-0" style={{maxWidth:'100%'}}>
        <nav className="navbar navbar-expand-lg " data-bs-theme="dark" >
          <div className="container-fluid ">
            <img src="https://firebasestorage.googleapis.com/v0/b/tatainvest-71bd6.appspot.com/o/logo.png?alt=media&token=47531390-01cb-40a6-9ab0-bca7f18cfec0" alt="TataInvest" height="50" width="70" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> 
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
             
              {authenticated ? (
                <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item">
                  <Link to="/dashboard"><p className="nav-link active" aria-current="page" >Dashboard</p></Link>
                </li>
                <li className="nav-item">
                <Link to="/profile"><p className="nav-link active" aria-current="page" >Profile</p></Link>
                 </li>
                <li className="nav-item">
                <Link to="/statement"><p className="nav-link active" aria-current="page" >Statement</p></Link>
                </li>
                <li className="nav-item">
                <Link to="/aboutus"><p className="nav-link active" aria-current="page" >About Us</p></Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/download"><i className="fas fa-download"></i> Download App</a>
                </li>
              </ul>
              ) : (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/"><p className="nav-link active mx-2" aria-current="page" >Home</p></Link>
                </li>
                <li className="nav-item">
                <Link to="/aboutus"><p className="nav-link active" aria-current="page" >About Us</p></Link>
                </li>
                <li className="nav-item">
                <Link to="/signup"><p className="nav-link active" aria-current="page" >Investment</p></Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/download"><i className="fas fa-download"> </i> Download App</a>
                </li>
              </ul>
              )}
              {authenticated ? (
                <>
                  <button className="btn btn-danger mx-2" onClick={handleSignOut} style={{fontSize: 12, padding: '10px 20px', borderRadius:'20px'}}>Log Out  <i class="fa fa-sign-out" aria-hidden="true"></i>
</button>
                </>
              ) : (
                <>

                <Button
                  onClick={()=>{history('/signup')}}
                  to="/signup"
                  style={{ backgroundColor: 'white', color: 'blue', fontSize: 12, padding: '10px 20px', borderRadius:'20px',margin:'5px' }}
                > Sign Up
                </Button>
                <Button
                  onClick={()=>{history('/login')}}
                  to="/login"
                  style={{ backgroundColor: 'white', color: 'green', fontSize: 12, padding: '10px 20px', borderRadius:'20px' }}
                >
                  Login
                </Button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
  );
}

export default Navbar;