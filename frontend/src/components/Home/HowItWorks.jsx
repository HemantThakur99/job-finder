import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <div className="section-header">
          <h2>How Career Connect Works</h2>
          <p>
            Start your job journey in three simple steps. Create a profile,
            explore openings, and connect directly with employers.
          </p>
        </div>
        <div className="banner">
          <div className="card">
            <span className="step">01</span>
            <FaUserPlus />
            <h4>Create Your Profile</h4>
            <p>
              Sign up quickly and highlight your skills, experience, and career
              goals in a polished profile.
            </p>
          </div>
          <div className="card">
            <span className="step">02</span>
            <MdFindInPage />
            <h4>Search & Apply</h4>
            <p>
              Browse verified openings, filter roles by your strengths, and
              apply with a single click.
            </p>
          </div>
          <div className="card">
            <span className="step">03</span>
            <IoMdSend />
            <h4>Get Noticed</h4>
            <p>
              Track your applications, stay updated on interviews, and grow your
              career with employers who value your talent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
