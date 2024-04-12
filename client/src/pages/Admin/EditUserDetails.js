import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase/config.js';
import './EditUserDetails.css';

const EditUserDetails = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [newUserData, setNewUserData] = useState({
        name: '',
        phone: '',
        address: '',
        investedAmount: '',
        interestAmount: '',
        referralAmount: '',
        withdrawableAmount: ''
    });

    const history = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserData(userData);
                    setNewUserData(userData);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleUpdateInfo = async () => {
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, newUserData);
            console.log('User info updated successfully!');
            history('/admin'); // Redirect to admin dashboard after updating user details
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="edit-user-container">
            <h1>Edit User Details</h1>
            <div className="user-details">
                <div className="detail">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newUserData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="detail">
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={newUserData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="detail">
                    <label>Invested Amount:</label>
                    <input
                        type="text"
                        name="investedAmount"
                        value={newUserData.investedAmount}
                        onChange={handleChange}
                    />
                </div>
                <div className="detail">
                    <label>Interest Amount:</label>
                    <input
                        type="text"
                        name="interestAmount"
                        value={newUserData.interestAmount}
                        onChange={handleChange}
                    />
                </div>
                <div className="detail">
                    <label>Referral Amount:</label>
                    <input
                        type="text"
                        name="referralAmount"
                        value={newUserData.referralAmount}
                        onChange={handleChange}
                    />
                </div>
                <div className="detail">
                    <label>Withdrawable Amount:</label>
                    <input
                        type="text"
                        name="withdrawableAmount"
                        value={newUserData.withdrawableAmount}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button className="update-button" onClick={handleUpdateInfo}>Update Info</button>
        </div>
    );
};

export default EditUserDetails;
