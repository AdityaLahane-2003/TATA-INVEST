import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar.js";
import "./css/dashboard.css";

function DashboardScreen() {
    const [userData, setUser] = useState(null);
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
                })
                .catch((error) => {
                    console.log('Error fetching user data:', error);
                });
        } else {
            history('/login');
        }
    });

    const addMoneyOnClick = () => {
        history("/addmoney");
    }
    const withdrawMoneyOnClick = () => {
        history("/withdrawmoney");
    }

    const completeKYCOnClick = () => {
        history("/kyc-step1");
    }

    return (
        <div className="container">
            <div className="dashboard-container">
                <h5>Your Account Balance</h5>
                <div className="progress-bar-container">
                    <ProgressBar investedAmount={userData?.investedAmount || 0} />
                </div>
                <div style={{ margin: '0 auto' }}>
                    <button className="add-money-button btn-1"  onClick={addMoneyOnClick}>Add Money</button>
                    <button className="add-money-button btn-2"  onClick={withdrawMoneyOnClick}>Withdraw</button>
                </div>
            </div>
            <div>
                <div className="info-container">
                    <div className="info-card learn-more-card">
                        <h3><i class="fa fa-line-chart" aria-hidden="true"> </i> Complete Your KYC</h3>
                        <p>and start withdrawing money effortlessly</p>
                        <button className="action-button" onClick={completeKYCOnClick}>Complete KYC</button> 
                    </div>
                    <div className="info-card learn-more-card">
                        <h3><i class="fa fa-usd" aria-hidden="true"> </i> Know Your Earnings</h3>
                        <p>Explore our investment plans</p>
                        <button className="action-button">Learn More</button> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardScreen;
                   