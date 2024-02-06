import React, { useState } from 'react';
import './Main-Login.css';
import Overlay_ForgotPasswordForm from './Overlay-ForgotPasswordForm';

function Main_Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };
  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
  };

  return (
    <div className={`container ${isSignIn ? '' : 'right-panel-active'}`}>
      <div className="form-container sign-in-container">
        <img src="logo2.png" alt="Logo" style={{ width: '60%', height: '35%', marginLeft: '10%', marginTop: '-5%' }} />
        <form action="#">
          <h1>STUDENT IN</h1>
          <span>login into your account</span>
          <input type="email" placeholder="EMAIL" />
          <input type="password" placeholder="PASSWORD" />
          <div style={{ display: 'flex' }}>
            <a href='#' style={{ marginLeft: '-15%' }}>Forgot your password?</a>
            <a href="#" className="clicks" style={{ marginLeft: '-2%' }} onClick={handleForgotPasswordClick}>click here</a>
          </div>
          <button>Sign in</button>
          <div style={{ display: 'flex', marginTop: '20%' }}>
            <a href="#" style={{ marginLeft: '-20%', marginTop: '0%' }}>Don't have an account?</a>
            <a href="index1.html" className="clicks" style={{ marginLeft: '-2%', marginTop: '0%' }}>Register</a>
          </div>
        </form>
      </div>
      <div className="form-container sign-up-container">
        <img src="logo2.png" alt="Logo" style={{ width: '60%', height: '35%', marginLeft: '10%', marginTop: '-5%' }} />
        <form action="#" style={{ marginTop: '-60%' }}>
          <h1>STAFF'S IN</h1>
          <span>Use your email registration</span>
          <input type="email" placeholder="EMAIL" />
          <input type="password" placeholder="PASSWORD" />
          <div style={{ display: 'flex' }}>
            <a href="#" style={{ marginLeft: '-15%' }}>Forgot your password?</a>
            <a href="#" className="clicks" style={{ marginLeft: '-2%' }} onClick={handleForgotPasswordClick}>click here</a>
          </div>
          <button>Sign up</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel over-left">
            <h1 style={{ marginLeft: '-17%' }}>Are you <br />student?</h1>
            <p style={{ marginLeft: '-17%' }}>Click this to visit <br />Student's login page</p>
            <button className="ghost" id="signin" style={{ marginLeft: '-17%' }} onClick={() => setIsSignIn(true)}>Student In</button>
          </div>
          <div className="overlay-panel over-right">
            <h1 style={{ marginLeft: '20%' }}>Are you Teacher?</h1>
            <p style={{ marginLeft: '19%' }}>Click this to visit  <br />staff's login page</p>
            <button className="ghost" id="signup" style={{ marginLeft: '19%' }} onClick={() => setIsSignIn(false)}>Staff's In</button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Main_Login;
