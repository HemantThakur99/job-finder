import React from "react";
import { FaShieldAlt, FaSearch, FaRocket, FaHandshake } from "react-icons/fa";

const FeatureHighlights = () => {
  const features = [
    {
      id: 1,
      title: "Verified Companies",
      description: "Work with trusted employers and vetted opportunities that match your career goals.",
      icon: <FaShieldAlt />,
    },
    {
      id: 2,
      title: "Smart Job Matching",
      description: "Get tailored recommendations based on your profile, skills and preferences.",
      icon: <FaSearch />,
    },
    {
      id: 3,
      title: "Fast Hiring",
      description: "Apply quickly, track status instantly, and move from search to offer faster.",
      icon: <FaRocket />,
    },
    {
      id: 4,
      title: "Employer Support",
      description: "Employers can manage listings, review candidates, and contact applicants effortlessly.",
      icon: <FaHandshake />,
    },
  ];

  return (
    <div className="features">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose CareerConnect</h2>
          <p>Built for both job seekers and employers to deliver a fast, secure, and modern hiring experience.</p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;
