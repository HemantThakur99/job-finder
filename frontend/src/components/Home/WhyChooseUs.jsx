import { FaShieldAlt, FaBell, FaPaperPlane, FaChartLine } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaShieldAlt />,
      title: "Trusted Employers",
      description:
        "Only verified companies and real openings are featured, so every application counts.",
    },
    {
      id: 2,
      icon: <FaBell />,
      title: "Instant Alerts",
      description:
        "Get notified the moment new roles match your skills and preferences.",
    },
    {
      id: 3,
      icon: <FaPaperPlane />,
      title: "Easy Application",
      description:
        "Apply with confidence using resume uploads, guided forms, and fast follow-up tools.",
    },
    {
      id: 4,
      icon: <FaChartLine />,
      title: "Career Insights",
      description:
        "Track your progress with status updates and personalized hiring analytics.",
    },
  ];

  return (
    <div className="whyChooseUs">
      <div className="container">
        <div className="section-header">
          <h2>Why CareerConnect?</h2>
          <p>
            A smarter job search experience with verified employers, tailored
            alerts, and a simple application workflow that keeps you moving.
          </p>
        </div>
        <div className="grid">
          {features.map((feature) => (
            <div className="card" key={feature.id}>
              <div className="icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
