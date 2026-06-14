import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaBriefcase, FaFileAlt } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "/api/v1";
        const res = await axios.get(`${apiUrl}/admin/overview`, { withCredentials: true });
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  if (loading) return <div className="container"><p>Loading dashboard...</p></div>;
  if (!data) return <div className="container"><p>Unable to load dashboard.</p></div>;

  const statusLabels = data.applicationsByStatus.map(s => s._id || 'Unknown');
  const statusCounts = data.applicationsByStatus.map(s => s.count);

  const categoryLabels = data.jobsByCategory.map(c => c._id || 'Other');
  const categoryCounts = data.jobsByCategory.map(c => c.count);

  const statusData = {
    labels: statusLabels,
    datasets: [
      {
        label: 'Applications',
        data: statusCounts,
        backgroundColor: ['#60a5fa', '#f59e0b', '#10b981', '#ef4444', '#7c3aed'],
      },
    ],
  };

  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Jobs by Category',
        data: categoryCounts,
        backgroundColor: 'rgba(59,130,246,0.8)'
      }
    ]
  };

  return (
    <section className="admin-dashboard page">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-cards">
          <div className="stat-card">
            <div className="stat-icon"><FaUsers /></div>
            <div className="stat-number">{data.totalUsers}</div>
            <div className="stat-label">Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaBriefcase /></div>
            <div className="stat-number">{data.totalJobs}</div>
            <div className="stat-label">Jobs</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaFileAlt /></div>
            <div className="stat-number">{data.totalApplications}</div>
            <div className="stat-label">Applications</div>
          </div>
        </div>

        <div className="analytics-section">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <h3>Applications by Status</h3>
              <Pie data={statusData} />
            </div>
            <div>
              <h3>Jobs by Category</h3>
              <Bar data={categoryData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>

          <h3 style={{ marginTop: '1.25rem' }}>Recent Applications</h3>
          <div className="recent-apps">
            {data.recentApplications.map(app => (
              <div className="recent-app" key={app._id}>
                <div><strong>{app.name}</strong> — {app.email}</div>
                <div>Status: {app.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
