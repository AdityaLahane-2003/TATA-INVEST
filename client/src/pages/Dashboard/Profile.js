import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { handleDeleteAccount } from "../../Firebase/config.js";
import { getUser } from "../../utils/getUser.js";
import './css/profile.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    const fetchedUser = localStorage.getItem('userId');
    if (fetchedUser) {
      getUser(fetchedUser)
        .then((userData) => {
          if (userData) {
            setUser(userData);
          } else {
            console.log('User not found');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
          setLoading(false);
        });
    } else {
      history('/login');
    }
  }, [history]);

  const handleDeleteUserAccount = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      handleDeleteAccount()
        .then(() => {
          localStorage.removeItem('userId');
          history('/login');
        })
        .catch((error) => {
          console.log('Error deleting user account:', error);
        });
    }
  };
  const copyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };


  return (
    <div className="container mt-5 mb-5">
      {loading ? (
        <p className="text-center">Loading user data...</p>
      ) : user ? (
        <div className="profile-section">
          {user.kycDone ? <div className="kyc-card">
            <i className="fa fa-check" style={{ fontSize: '25px' }}></i>
            <div className='card-content'>
              <h6>KYC Done</h6>
              <p>Can Start borrowing @ 1.2% daily</p>
            </div>
          </div>
            :
            <Link to="/kyc" className="kyc-card">
              <i className="fa fa-exclamation-circle" style={{ fontSize: '25px' }}></i>
              <div className="card-content">
                <h6>Complete Your KYC</h6>
                <p>Start borrowing @ 1.2% daily</p>
              </div>
              <i className="fas fa-chevron-right" style={{ fontSize: '25px' }}></i>
            </Link>
          }

          <div className="account-details text-center">
            <h1>Account</h1>
            <ul class="list-group" >
              <li className="list-group-item" >
                <div>
                  <i className="fas fa-phone" style={{ color: "rgba(135, 132, 220, 1)" }}></i> Phone Number: {user.phone}
                </div>
              </li>
              <li className="list-group-item "> <div>
                <i className="fas fa-envelope" style={{ color: "rgba(135, 132, 220, 1)" }}></i> Email: {user.email}
              </div></li>
              <li className="list-group-item">  <div>
                <i className="fas fa-home" style={{ color: "rgba(135, 132, 220, 1)" }}></i> Address: {user.address}
              </div></li>
              <li className="list-group-item">  <div>
                <i className="fas fa-calendar" style={{ color: "rgba(135, 132, 220, 1)" }}></i> Referral Code :  {copied ? <i className="fas fa-check-circle"></i> : <i className="far fa-copy" onClick={copyReferralCode}></i>}
              </div></li>
              <li className="list-group-item"> <div>
                <i className="fas fa-user" style={{ color: "rgba(135, 132, 220, 1)" }}></i> KYC Verification:{" "}
                {user.kycDone ? <i className="fas fa-check-circle" style={{ color: "green" }}>Done</i> : <i className="fas fa-exclamation-circle" style={{ color: "red" }}></i>}
              </div></li>
            </ul>

          </div>

          <div className="action-buttons">
            <ActionButton onClick={handleDeleteUserAccount} text="Delete Account" iconClass="fas fa-trash" color="danger" />
            <ActionButton to="/updateinfo" text="Update Info" iconClass="fas fa-edit" color="blue" />
          </div>
        </div>
      ) : (
        <p className="text-center">No user data found.</p>
      )}
    </div>
  );
};

export default ProfilePage;

const ActionButton = ({ onClick, to, iconClass, text, color }) => (
  <button className={`btn btn-${color} me-2`} onClick={onClick}>
    <i className={iconClass}></i>
    {to ? <Link to={to} className="ms-2">{text}</Link> : <span className="ms-2">{text}</span>}
  </button>
);
