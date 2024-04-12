import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, createUserDocument } from "../../Firebase/config.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store.js";
import axios from 'axios';

function SignUp() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [formData, setFormData] = useState({
    user_name: "",
    parentReferralCode: "",
  });
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const fetchedUser = localStorage.getItem('userId');
    if (fetchedUser) {
      history('/dashboard');
    }
    const query = new URLSearchParams(location.search);
    const referralCode = query.get("referralCode");
    if (referralCode) {
      setFormData((prevData) => ({
        ...prevData,
        parentReferralCode: referralCode,
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleParentReferralCode = async (childrenId) => {
    const dummyData = await axios.get(`/api/parentReferralUpdate/${childrenId}`);
  };

  const sendOTP = async () => {
    try {
      if (phone === '' || formData.user_name === '') {
        alert("Name and Phone Number required");
        return;
      }
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setUser(confirmation);
      setConfirmationResult(confirmation);
      setCaptchaVerified(true);
      setOtpSent(true);
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
      }, 60000);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleResendOTP = () => {
    setTimer(60);
    setOtpSent(true);
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerInterval);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        otp === '' || !confirmationResult
      ) {
        alert("Please enter OTP !");
        return;
      }
      const data = await confirmationResult.confirm(otp);
      if (data.user) {
        createUserDocument(
          data.user,
          formData.user_name,
          formData.parentReferralCode,
          phone,
          "Demo Address"
        ).then(() => {
          if (formData.parentReferralCode !== "") {
            handleParentReferralCode(data.user.uid);
          }
        });
        localStorage.setItem("userId", data?.user.uid);
        localStorage.setItem("phoneNumber", data?.user.phone);
        dispatch(authActions.login());
        history("/dashboard");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="container-signup">
      <div className="signup-container">
        <div className="signup-heading">
          <h6 style={{ margin: '0 auto', color:'white' }}>Sign-Up</h6>
          <div style={{ marginLeft: 'auto' }}>
            <Link to="/login" className="signin-link" style={{ color: 'white', fontSize: '12px' }}>
              Already have an account? <span style={{ color: 'blue', textDecoration: 'underline' }}>Sign In</span>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="user_name" className="required" style={{color:'white'}}>Full Name <span style={{ color: 'red' }}>*</span></label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              placeholder="Full Name"
              className="input-field"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="required" style={{color:'white'}}>Phone Number <span style={{ color: 'red' }}>*</span></label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone Number (10 digits)"
              className="input-field"
              onChange={(e) => setPhone("+91" + e.target.value)}
              required
              pattern="[0-9]{10}"
              maxLength="10"
            />
          </div>
          {formData.parentReferralCode === "" && (
            <div className="form-group">
            <label htmlFor="phone" className="required" style={{color:'white'}}>Referral Code</label>
              <input
                name="parentReferralCode"
                type="text"
                placeholder="Referral Code"
                className="input-field"
                value={formData.parentReferralCode}
                onChange={handleChange}
              />
            </div>
          )}
          {!otpSent && <div id="recaptcha" className="recaptcha"></div>}
          {otpSent && (
            <div className="form-group">
              <label htmlFor="otp" className="required">Enter OTP <span style={{ color: 'red' }}>*</span></label>
              <input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter OTP"
                className="input-field"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          {!otpSent && (
            <center className="form-group">
              <button
                type="button"
                className="btn get-otp-button"
                onClick={sendOTP}
                disabled={captchaVerified}
              >
                Get OTP
              </button>
            </center>
          )}
          <div className="form-group">
          </div>
          {otpSent && (
            <button type="submit" className="signup-button">
              Verify OTP & Sign Up
            </button>
          )}
          {otpSent && (
            <center className="form-group">
              <button
                type="button"
                className="btn resend-otp-button"
                disabled={timer > 0}
                onClick={handleResendOTP}
              >
                Resend OTP {timer > 0 && `(${timer}s)`}
              </button>
            </center>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;