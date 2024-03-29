import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./signIn.css"; // CSS file 
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store.js";
import { Skeleton } from "@mui/material";

function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        localStorage.setItem("userId", data?.user.uid);
        dispatch(authActions.login());
        history("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.code);
      });
  };

  const handleReset = () => {
    history("/resetpassword");
  };

  // Simulate a delay before showing the actual sign-in form
  setTimeout(() => {
    setLoading(false);
  }, 1000); // Adjust the delay time as needed (in milliseconds)

  return (
    <div className="container-signin">
      <div className="signin-container">
        <h1>Sign In</h1>
        {loading ? (
          <>
            <Skeleton variant="text" width={200} height={50} />
            <Skeleton variant="text" width={300} height={50} />
            <Skeleton variant="text" width={300} height={50} />
          </>
        ) : (
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <input
                name="email"
                placeholder="Email"
                className="input-field"
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input-field"
              />
            </div>
            <div className="forgot-password">
              <p onClick={handleReset}>Forgot Password?</p>
            </div>
            <div className="signup-link">
              <Link to="/signup" className="signup-link-text" style={{color:'#fff'}}>
                Don't have an account? Sign Up
              </Link>
            </div>
            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
