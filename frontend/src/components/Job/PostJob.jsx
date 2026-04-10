import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [errors, setErrors] = useState({});

  const { isAuthorized, user } = useContext(Context);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    
    // Real-time validation for location
    if (value.trim() && value.trim().length < 10) {
      setErrors(prev => ({
        ...prev,
        location: "Location must be at least 10 characters long"
      }));
    } else if (value.trim().length >= 10) {
      setErrors(prev => ({
        ...prev,
        location: undefined
      }));
    } else if (!value.trim()) {
      setErrors(prev => ({
        ...prev,
        location: "Location is required"
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Job title is required";
    }
    
    if (!description.trim()) {
      newErrors.description = "Job description is required";
    }
    
    if (!category) {
      newErrors.category = "Please select a category";
    }
    
    if (!country.trim()) {
      newErrors.country = "Country is required";
    }
    
    if (!city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!location.trim()) {
      newErrors.location = "Location is required";
    } else if (location.trim().length < 10) {
      newErrors.location = "Location must be at least 10 characters long";
    }
    
    if (salaryType === "default") {
      newErrors.salaryType = "Please select a salary type";
    }
    
    if (salaryType === "Fixed Salary" && !fixedSalary.trim()) {
      newErrors.fixedSalary = "Fixed salary is required";
    }
    
    if (salaryType === "Ranged Salary") {
      if (!salaryFrom.trim()) {
        newErrors.salaryFrom = "Minimum salary is required";
      }
      if (!salaryTo.trim()) {
        newErrors.salaryTo = "Maximum salary is required";
      }
      if (salaryFrom && salaryTo && parseFloat(salaryFrom) >= parseFloat(salaryTo)) {
        newErrors.salaryTo = "Maximum salary must be greater than minimum salary";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    try {
      const jobData = salaryType === "Fixed Salary" 
        ? {
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
          }
        : {
            title,
            description,
            category,
            country,
            city,
            location,
            salaryFrom,
            salaryTo,
          };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/job/post`,
        jobData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      toast.success("Job posted successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
      setSalaryType("default");
      setErrors({});
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job");
    }
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW JOB</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <div className="form-group">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Job Title"
                  className={errors.title ? "error" : ""}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>
              <div className="form-group">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={errors.category ? "error" : ""}
                >
                  <option value="">Select Category</option>
                  <option value="Graphics & Design">Graphics & Design</option>
                  <option value="Mobile App Development">
                    Mobile App Development
                  </option>
                  <option value="Frontend Web Development">
                    Frontend Web Development
                  </option>
                  <option value="Business Development Executive">
                    Business Development Executive
                  </option>
                  <option value="Account & Finance">Account & Finance</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Video Animation">Video Animation</option>
                  <option value="MEAN Stack Development">
                    MEAN STACK Development
                  </option>
                  <option value="MERN Stack Development">
                    MERN STACK Development
                  </option>
                  <option value="Data Entry Operator">Data Entry Operator</option>
                </select>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>
            </div>
            <div className="wrapper">
              <div className="form-group">
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className={errors.country ? "error" : ""}
                />
                {errors.country && <span className="error-message">{errors.country}</span>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className={errors.city ? "error" : ""}
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Location (minimum 10 characters)"
                className={errors.location ? "error" : ""}
                maxLength="100"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
              <span className={`character-count ${location.length >= 10 ? 'valid' : 'invalid'}`}>
                {location.length}/10 characters minimum
              </span>
            </div>
            <div className="salary_wrapper">
              <div className="form-group">
                <select
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value)}
                  className={errors.salaryType ? "error" : ""}
                >
                  <option value="default">Select Salary Type</option>
                  <option value="Fixed Salary">Fixed Salary</option>
                  <option value="Ranged Salary">Ranged Salary</option>
                </select>
                {errors.salaryType && <span className="error-message">{errors.salaryType}</span>}
              </div>
              <div>
                {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Enter Fixed Salary"
                      value={fixedSalary}
                      onChange={(e) => setFixedSalary(e.target.value)}
                      className={errors.fixedSalary ? "error" : ""}
                    />
                    {errors.fixedSalary && <span className="error-message">{errors.fixedSalary}</span>}
                  </div>
                ) : (
                  <div className="ranged_salary">
                    <div className="form-group">
                      <input
                        type="number"
                        placeholder="Salary From"
                        value={salaryFrom}
                        onChange={(e) => setSalaryFrom(e.target.value)}
                        className={errors.salaryFrom ? "error" : ""}
                      />
                      {errors.salaryFrom && <span className="error-message">{errors.salaryFrom}</span>}
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        placeholder="Salary To"
                        value={salaryTo}
                        onChange={(e) => setSalaryTo(e.target.value)}
                        className={errors.salaryTo ? "error" : ""}
                      />
                      {errors.salaryTo && <span className="error-message">{errors.salaryTo}</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <textarea
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Job Description"
                className={errors.description ? "error" : ""}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
