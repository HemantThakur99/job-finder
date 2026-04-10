import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaDollarSign, 
  FaClock,
  FaTimes,
  FaChevronDown,
  FaBuilding,
  FaCalendarAlt,
  FaSpinner,
  FaExclamationTriangle
} from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { isAuthorized } = useContext(Context);

  // Get unique categories and locations for filters
  const categories = [...new Set(jobs.map(job => job.category))];
  const locations = [...new Set(jobs.map(job => job.country))];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/job/getall`, {
          withCredentials: true,
        });
        setJobs(response.data.jobs || response.data);
        setFilteredJobs(response.data.jobs || response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(job => job.country === selectedLocation);
    }

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [jobs, searchTerm, selectedCategory, selectedLocation]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLocation("");
  };

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="jobs page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <h1>ALL AVAILABLE JOBS</h1>
            <p>Find your dream job from {jobs.length} opportunities</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-number">{jobs.length}</div>
              <div className="stat-label">Total Jobs</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{categories.length}</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{locations.length}</div>
              <div className="stat-label">Locations</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Search and Filters */}
        <div className="search-filters-section">
          <div className={`search-bar ${isSearchFocused ? 'focused' : ''}`}>
            <div className="search-icon">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search jobs by title, description, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm("")}>
                <FaTimes />
              </button>
            )}
          </div>
          
          <div className="filters-container">
            <div className="filter-group">
              <div className="filter-label">
                <FaFilter />
                <span>Category</span>
                <FaChevronDown />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <div className="filter-label">
                <FaMapMarkerAlt />
                <span>Location</span>
                <FaChevronDown />
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="filter-select"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {(searchTerm || selectedCategory || selectedLocation) && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                <FaTimes />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Results Info */}
        <div className="results-info">
          <div className="results-text">
            <span className="results-count">
              {loading ? (
                <>
                  <FaSpinner className="spinner" />
                  Searching...
                </>
              ) : (
                <>
                  Found <strong>{filteredJobs.length}</strong> jobs
                  {searchTerm && ` for "${searchTerm}"`}
                </>
              )}
            </span>
            {filteredJobs.length !== jobs.length && (
              <span className="filter-indicator">
                Filters applied
              </span>
            )}
          </div>
          <div className="view-options">
            <button className="view-btn active">
              <FaBriefcase />
              Card View
            </button>
          </div>
        </div>

        {/* Job Cards */}
        <div className="banner">
          {loading ? (
            <div className="loading-state">
              <FaSpinner className="spinner" />
              <p>Loading amazing job opportunities...</p>
            </div>
          ) : currentJobs && currentJobs.length > 0 ? (
            currentJobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <div className="job-header">
                    <div className="job-title-section">
                      <h3>{element.title}</h3>
                      <div className="company-info">
                        <FaBuilding />
                        <span>{element.category}</span>
                      </div>
                    </div>
                    <div className="job-type-badge">
                      {element.category}
                    </div>
                  </div>
                  
                  <div className="job-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt />
                      <span>{element.city}, {element.country}</span>
                    </div>
                    <div className="detail-item">
                      <FaDollarSign />
                      <span>
                        {element.fixedSalary 
                          ? `$${element.fixedSalary.toLocaleString()}` 
                          : `$${element.salaryFrom?.toLocaleString()} - $${element.salaryTo?.toLocaleString()}`
                        }
                      </span>
                    </div>
                    <div className="detail-item">
                      <FaCalendarAlt />
                      <span>Posted {new Date(element.jobPostedOn).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="job-description">
                    <p>{element.description.substring(0, 150)}...</p>
                  </div>

                  <div className="card-footer">
                    <Link to={`/job/detail/${element._id}`} className="view-details-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-jobs-found">
              <div className="icon">
                <FaExclamationTriangle />
              </div>
              <h3>No Jobs Found</h3>
              <p>
                {searchTerm || selectedCategory || selectedLocation
                  ? "No jobs match your current filters. Try adjusting your search criteria."
                  : "No jobs available at the moment. Check back later!"
                }
              </p>
              {(searchTerm || selectedCategory || selectedLocation) && (
                <button className="clear-filters-btn" onClick={clearFilters}>
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn prev"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            <div className="pagination-info">
              Page {currentPage} of {totalPages}
            </div>
            
            <button
              className="pagination-btn next"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
