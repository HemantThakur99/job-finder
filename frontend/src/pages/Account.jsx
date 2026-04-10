import React, { useContext } from "react";
import { Context } from "../main";
import { FaUser, FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

const Account = () => {
  const { user } = useContext(Context);

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-header">
          <h1>My Account</h1>
          <p>Manage your profile and account settings</p>
        </div>
        
        <div className="account-content">
          <div className="profile-section">
            <h2>Profile Information</h2>
            <div className="profile-card">
              <div className="profile-avatar">
                <FaUser size={60} />
              </div>
              <div className="profile-details">
                <div className="detail-item">
                  <FaEnvelope />
                  <span>{user?.email || "user@example.com"}</span>
                </div>
                <div className="detail-item">
                  <FaPhone />
                  <span>{user?.phone || "+1 (555) 123-4567"}</span>
                </div>
                <div className="detail-item">
                  <FaBriefcase />
                  <span>{user?.role || "Job Seeker"}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt />
                  <span>{user?.location || "San Francisco, CA"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="actions-section">
            <h2>Account Actions</h2>
            <div className="action-buttons">
              <button className="btn-primary">Edit Profile</button>
              <button className="btn-secondary">Change Password</button>
              <button className="btn-danger">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
