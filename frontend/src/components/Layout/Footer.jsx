import React, { useContext } from 'react'
import {Context} from "../../main"
import {Link} from "react-router-dom"
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"

function Footer() {
  const {isAuthorized}  = useContext(Context)
  return (
    <footer className= {isAuthorized ? "footerShow" : "footerHide"}>
      <div className="footer-content">
        <div className="footer-section">
          <h4>CareerConnect</h4>
          <p>Your gateway to amazing career opportunities. Connect with top employers and find your dream job.</p>
          <div className="social-links">
            <Link to={'https://github.com/HemantThakur99'} target='github' aria-label="GitHub">
              <FaGithub />
            </Link>
            <Link to={'https://www.linkedin.com/in/hemant-thakur-a42b4a363/'} target='linkedin' aria-label="LinkedIn">
              <FaLinkedin />
            </Link>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="quick-links">
            <Link to="/">Home</Link>
            <Link to="/job/all">Browse Jobs</Link>
            <Link to="/application">Applications</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>For Employers</h4>
          <div className="quick-links">
            <Link to="/job/post">Post a Job</Link>
            <Link to="/employer/dashboard">Dashboard</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/support">Support</Link>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope />
              <span>support@careerconnect.com</span>
            </div>
            <div className="contact-item">
              <FaPhone />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CareerConnect. All Rights Reserved by Hemant.</p>
      </div>
    </footer>
  )
}

export default Footer