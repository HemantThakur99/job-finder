import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaClock, 
  FaEye, 
  FaTrash, 
  FaTimes, 
  FaCheck, 
  FaHourglassHalf,
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaFileAlt,
  FaBuilding,
  FaSpinner
} from "react-icons/fa";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "/api/v1";
      const endpoint = user?.role === "Employer" 
          ? `${apiUrl}/application/employer/getall`
          : `${apiUrl}/application/jobseeker/getall`;
        
        const response = await axios.get(endpoint, {
          withCredentials: true,
        });
        
        setApplications(response.data.applications || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthorized && user) {
      fetchApplications();
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  const deleteApplication = async (id) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      setDeletingId(id);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "/api/v1";
        const response = await axios.delete(
          `${apiUrl}/application/delete/${id}`,
          { withCredentials: true }
        );
        
        toast.success(response.data.message || "Application withdrawn successfully");
        setApplications((prevApplication) =>
          prevApplication.filter((application) => application._id !== id)
        );
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to withdraw application");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl.url || imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hired": return { bg: "#10b981", text: "#059669", border: "#059669" };
      case "Rejected": return { bg: "#ef4444", text: "#dc2626", border: "#dc2626" };
      case "Interview": return { bg: "#f59e0b", text: "#d97706", border: "#d97706" };
      case "Viewed": return { bg: "#60a5fa", text: "#2563eb", border: "#2563eb" };
      case "Applied": return { bg: "#6b7280", text: "#4b5563", border: "#4b5563" };
      default: return { bg: "#6b7280", text: "#4b5563", border: "#4b5563" };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Hired": return <FaCheck />;
      case "Rejected": return <FaTimes />;
      case "Interview": return <FaHourglassHalf />;
      case "Viewed": return <FaSearch />;
      case "Applied": return <FaClock />;
      default: return <FaClock />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === "all" || (app.status || "Pending") === filterStatus;
    const matchesSearch = searchTerm === "" || 
      app.jobInfo?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobInfo?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: applications.length,
    Pending: applications.filter(app => (app.status || "Pending") === "Pending").length,
    Accepted: applications.filter(app => app.status === "Accepted").length,
    Rejected: applications.filter(app => app.status === "Rejected").length,
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <div className="section-header">
            <div className="header-content">
              <div className="header-text">
                <h1>My Applications</h1>
                <p>Track your job applications and their progress</p>
              </div>
              <div className="header-stats">
                <div className="stat-card">
                  <div className="stat-number">{applications.length}</div>
                  <div className="stat-label">Total Applications</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{statusCounts.Pending}</div>
                  <div className="stat-label">Pending</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{statusCounts.Accepted}</div>
                  <div className="stat-label">Accepted</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="search-filter-section">
            <div className="search-bar">
              <FaSearch />
              <input
                type="text"
                placeholder="Search by job title, company, or your name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div className="status-filter">
            <div className="filter-tabs">
              <button 
                className={`tab-btn ${filterStatus === "all" ? "active" : ""}`}
                onClick={() => setFilterStatus("all")}
              >
                <FaBriefcase />
                <span>All</span>
                <span className="count">{statusCounts.all}</span>
              </button>
              <button 
                className={`tab-btn ${filterStatus === "Pending" ? "active" : ""}`}
                onClick={() => setFilterStatus("Pending")}
              >
                <FaHourglassHalf />
                <span>Pending</span>
                <span className="count">{statusCounts.Pending}</span>
              </button>
              <button 
                className={`tab-btn ${filterStatus === "Accepted" ? "active" : ""}`}
                onClick={() => setFilterStatus("Accepted")}
              >
                <FaCheck />
                <span>Accepted</span>
                <span className="count">{statusCounts.Accepted}</span>
              </button>
              <button 
                className={`tab-btn ${filterStatus === "Rejected" ? "active" : ""}`}
                onClick={() => setFilterStatus("Rejected")}
              >
                <FaTimes />
                <span>Rejected</span>
                <span className="count">{statusCounts.Rejected}</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <FaSpinner className="spinner" />
              <p>Loading your applications...</p>
            </div>
          ) : filteredApplications.length <= 0 ? (
            <div className="no-applications">
              <div className="icon">
                <FaBriefcase />
              </div>
              <h3>
                {searchTerm ? "No matching applications found" : "No Applications Found"}
              </h3>
              <p>
                {searchTerm 
                  ? "Try adjusting your search terms or filters."
                  : filterStatus === "all" 
                    ? "You haven't applied to any jobs yet." 
                    : `No applications with status: ${filterStatus}`
                }
              </p>
              <div className="action-buttons">
                {searchTerm && (
                  <button className="secondary-btn" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </button>
                )}
                <button className="primary-btn" onClick={() => navigateTo("/job/getall")}>
                  Browse Jobs
                </button>
              </div>
            </div>
          ) : (
            <div className="applications-grid">
              {filteredApplications.map((element) => (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                  deletingId={deletingId}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <div className="section-header">
            <div className="header-content">
              <div className="header-text">
                <h1>Applications From Job Seekers</h1>
                <p>Review and manage applications from candidates</p>
              </div>
              <div className="header-stats">
                <div className="stat-card">
                  <div className="stat-number">{applications.length}</div>
                  <div className="stat-label">Total Applications</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{statusCounts.Pending}</div>
                  <div className="stat-label">Pending Review</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{statusCounts.Accepted}</div>
                  <div className="stat-label">Accepted</div>
                </div>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="loading-state">
              <FaSpinner className="spinner" />
              <p>Loading applications...</p>
            </div>
          ) : applications.length <= 0 ? (
            <div className="no-applications">
              <div className="icon">
                <FaBriefcase />
              </div>
              <h3>No Applications Found</h3>
              <p>No job seekers have applied to your positions yet.</p>
            </div>
          ) : (
            <div className="applications-grid">
              {applications.map((element) => (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal url={resumeImageUrl} applicationId={modalOpen && applications.find(a => a.resume && a.resume.url === resumeImageUrl)?._id} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal, getStatusColor, getStatusIcon, deletingId }) => {
  const appliedDate = new Date(element.appliedOn || Date.now()).toLocaleDateString();
  const status = element.status || "Pending";
  const statusColors = getStatusColor(status);
  const isDeleting = deletingId === element._id;
  
  return (
    <div className="job_seeker_card">
      <div className="card-header">
        <div className="job-info">
          <h3>{element.jobInfo?.title || "Job Title"}</h3>
          <div className="company-info">
            <FaBuilding />
            <span>{element.jobInfo?.company || "Company"}</span>
          </div>
        </div>
        <div className="status-badge" style={{ 
          background: statusColors.bg, 
          color: statusColors.text,
          borderColor: statusColors.border 
        }}>
          {getStatusIcon(status)}
          <span>{status}</span>
        </div>
      </div>

      <div className="job-details">
        <div className="detail-item">
          <FaMapMarkerAlt />
          <span>{element.jobInfo?.location || "Location"}</span>
        </div>
        <div className="detail-item">
          <FaDollarSign />
          <span>
            {element.jobInfo?.fixedSalary 
              ? `$${element.jobInfo.fixedSalary.toLocaleString()}` 
              : element.jobInfo?.salaryFrom && element.jobInfo?.salaryTo
                ? `$${element.jobInfo.salaryFrom.toLocaleString()} - $${element.jobInfo.salaryTo.toLocaleString()}`
                : "Salary not specified"
            }
          </span>
        </div>
        <div className="detail-item">
          <FaCalendarAlt />
          <span>Applied {appliedDate}</span>
        </div>
      </div>

      <div className="applicant-info">
        <h4>Your Application Details</h4>
        <div className="info-grid">
          <div className="info-item">
            <FaUser />
            <div className="info-content">
              <span className="label">Name</span>
              <span className="value">{element.name}</span>
            </div>
          </div>
          <div className="info-item">
            <FaEnvelope />
            <div className="info-content">
              <span className="label">Email</span>
              <span className="value">{element.email}</span>
            </div>
          </div>
          <div className="info-item">
            <FaPhone />
            <div className="info-content">
              <span className="label">Phone</span>
              <span className="value">{element.phone}</span>
            </div>
          </div>
          <div className="info-item">
            <FaHome />
            <div className="info-content">
              <span className="label">Address</span>
              <span className="value">{element.address}</span>
            </div>
          </div>
        </div>
        <div className="cover-letter-preview">
          <div className="cover-letter-header">
            <FaFileAlt />
            <span>Cover Letter</span>
          </div>
          <p>{element.coverLetter}</p>
        </div>
      </div>

      <div className="resume-section">
        <div className="resume-header">
          <h4>Resume</h4>
        </div>
        <div className="resume-preview">
          <div className="resume-thumbnail">
            <img
              src={element.resume.url}
              alt="resume"
              onClick={() => openModal(element.resume.url)}
            />
            <div className="resume-overlay">
              <FaEye />
            </div>
          </div>
          <button 
            className="view-resume-btn" 
            onClick={() => openModal(element.resume.url)}
          >
            <FaEye /> View Resume
          </button>
        </div>
      </div>

      <div className="card-actions">
        {(status === "Pending" || status === "Rejected") && (
          <button 
            className={`withdraw-btn ${isDeleting ? "loading" : ""}`} 
            onClick={() => deleteApplication(element._id)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <FaSpinner className="spinner" />
                Withdrawing...
              </>
            ) : (
              <>
                <FaTrash /> Withdraw Application
              </>
            )}
          </button>
        )}
        {status === "Accepted" && (
          <button className="accepted-btn" disabled>
            <FaCheck /> Application Accepted
          </button>
        )}
        {status === "Rejected" && (
          <button className="rejected-btn" disabled>
            <FaTimes /> Application Rejected
          </button>
        )}
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal, getStatusColor, getStatusIcon }) => {
  const apiUrl = import.meta.env.VITE_API_URL || "/api/v1";
  const appliedDate = new Date(element.appliedOn || Date.now()).toLocaleDateString();
  const status = element.status || "Pending";
  const statusColors = getStatusColor(status);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      const { data } = await axios.put(
        `${apiUrl}/application/${element._id}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      // Optionally update UI by mutating element.status
      element.status = data.application.status;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };
  
  return (
    <div className="job_seeker_card employer-view">
      <div className="card-header">
        <div className="job-info">
          <h3>{element.jobInfo?.title || "Job Title"}</h3>
          <div className="company-info">
            <FaBuilding />
            <span>Your Position</span>
          </div>
        </div>
        <div className="status-badge" style={{ 
          background: statusColors.bg, 
          color: statusColors.text,
          borderColor: statusColors.border 
        }}>
          {getStatusIcon(status)}
          <span>{status}</span>
        </div>
      </div>

      <div className="applicant-info">
        <h4>Candidate Information</h4>
        <div className="info-grid">
          <div className="info-item">
            <FaUser />
            <div className="info-content">
              <span className="label">Name</span>
              <span className="value">{element.name}</span>
            </div>
          </div>
          <div className="info-item">
            <FaEnvelope />
            <div className="info-content">
              <span className="label">Email</span>
              <span className="value">{element.email}</span>
            </div>
          </div>
          <div className="info-item">
            <FaPhone />
            <div className="info-content">
              <span className="label">Phone</span>
              <span className="value">{element.phone}</span>
            </div>
          </div>
          <div className="info-item">
            <FaHome />
            <div className="info-content">
              <span className="label">Address</span>
              <span className="value">{element.address}</span>
            </div>
          </div>
          <div className="info-item">
            <FaCalendarAlt />
            <div className="info-content">
              <span className="label">Applied on</span>
              <span className="value">{appliedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cover-letter-section">
        <div className="cover-letter-header">
          <FaFileAlt />
          <span>Cover Letter</span>
        </div>
        <div className="cover-letter-content">
          <p>{element.coverLetter}</p>
        </div>
      </div>

      <div className="resume-section">
        <div className="resume-header">
          <h4>Resume</h4>
        </div>
        <div className="resume-preview">
          <div className="resume-thumbnail">
            <img
              src={element.resume.url}
              alt="resume"
              onClick={() => openModal(element.resume.url)}
            />
            <div className="resume-overlay">
              <FaEye />
            </div>
          </div>
          <button 
            className="view-resume-btn" 
            onClick={() => openModal(element.resume.url)}
          >
            <FaEye /> View Resume
          </button>
        </div>
      </div>
      <div style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <label style={{ fontWeight: 600, marginRight: '0.5rem' }}>Status</label>
        <select value={status} onChange={handleStatusChange} disabled={updating}>
          <option value="Applied">Applied</option>
          <option value="Viewed">Viewed</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Hired">Hired</option>
        </select>
        {updating && <FaSpinner className="spinner" />}
      </div>
    </div>
  );
};
