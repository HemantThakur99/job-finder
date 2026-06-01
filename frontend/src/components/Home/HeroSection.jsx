import React from "react";
import { Link } from "react-router-dom";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <span className="eyebrow">Career opportunity, simplified</span>
          <h1>Find your next role with confidence</h1>
          <p>
            Discover job opportunities that match your skills, build your
            career, and connect with top employers in one modern hiring
            platform.
          </p>
          <div className="cta-buttons">
            <Link to="/job/getall" className="btn-primary">
              Browse Jobs
            </Link>
            <Link to="/job/post" className="btn-secondary">
              Post a Job
            </Link>
          </div>
        </div>
        <div className="image">
          <img src="/heroS.jpg" alt="Career growth illustration" />
        </div>
      </div>
      <div className="details">
        {details.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="content">
                <h4>{element.title}</h4>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
