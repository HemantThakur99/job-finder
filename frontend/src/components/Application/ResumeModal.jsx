import React from "react";

const ResumeModal = ({ url, applicationId, onClose }) => {
  if (!url) return null;

  const isPdf = url.toLowerCase().endsWith('.pdf');
  const downloadHref = `${import.meta.env.VITE_API_URL}/application/${applicationId}/resume?redirect=true`;

  return (
    <div className="resume-modal" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="close" onClick={onClose} aria-label="Close resume preview">
          &times;
        </button>

        <div style={{ width: '100%', height: '80vh' }}>
          {isPdf ? (
            <iframe src={url} title="resume" style={{ width: '100%', height: '100%', border: 'none' }} />
          ) : (
            <img src={url} alt="resume" style={{ width: '100%', height: 'auto', display: 'block' }} />
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', justifyContent: 'flex-end' }}>
          <a href={downloadHref} className="view-details-btn" target="_blank" rel="noreferrer">Download</a>
          <button className="view-details-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
