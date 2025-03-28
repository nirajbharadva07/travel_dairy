import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Trash2, Users as UsersIcon, Activity, TrendingUp } from "lucide-react";
import "../../Css/dashboard.css";

Chart.register(CategoryScale);

const ADMIN_ID = "67e51d0762a68dfde3089dbb";

export const Dashboard = ({ setActiveRoute }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeUsers: 0,
    avgAge: 0,
    recentActivity: 0,
  });

  // Set active route name on component mount
  useEffect(() => {
    setActiveRoute("Dashboard");
  }, [setActiveRoute]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/user");
      const filteredUsers = response.data?.data?.filter(user => user._id !== ADMIN_ID) || [];
      setUsers(filteredUsers);
      calculateStats(filteredUsers);
      setChartData(buildAgeChartData(filteredUsers));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const calculateStats = (users) => {
    const activeUsers = users.filter(user => user.status).length;
    const ages = users.map(user => user.age).filter(age => typeof age === 'number');
    const avgAge = ages.length > 0 ? (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1) : 0;
    
    setStats({
      activeUsers,
      avgAge,
      recentActivity: users.filter(user => new Date(user.lastLogin) > new Date(Date.now() - 86400000)).length
    });
  };

  const buildAgeChartData = (users) => {
    const ageCounts = users.reduce((acc, user) => {
      if (user.age != null) {
        acc[user.age] = (acc[user.age] || 0) + 1;
      }
      return acc;
    }, {});

    const sortedAges = Object.keys(ageCounts)
      .map(Number)
      .sort((a, b) => a - b);

    return {
      labels: sortedAges.map(age => `Age ${age}`),
      datasets: [{
        label: "User Age Distribution",
        data: sortedAges.map(age => ageCounts[age]),
        backgroundColor: '#55197A',
        borderColor: '#67e51d',
        borderWidth: 2,
        borderRadius: 4,
        barThickness: 40,
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        hoverBackgroundColor: '#36164A',
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top',
        labels: { color: '#fff' }
      },
      title: { 
        display: true, 
        text: 'User Age Statistics',
        color: '#fff',
        font: { size: 18 }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: { color: '#fff' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#fff' }
      }
    },
    elements: {
      bar: {
        borderSkipped: false,
        borderRadius: 15,
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/user/${userId}`);
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      setChartData(buildAgeChartData(updatedUsers));
      calculateStats(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-glow"></div>
      </div>

      <div className="chart-container glass-card">
        <h2>Age Distribution</h2>
        <div className="chart-wrapper">
          <Bar
            data={chartData}
            options={chartOptions}
          />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card neon-card">
          <div className="stat-icon gradient-purple">
            <UsersIcon size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p>{users.length}</p>
            <div className="stat-trend">
              <TrendingUp size={16} />
              <span>+{(users.length / 100 * 5).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="stat-card neon-card">
          <div className="stat-icon gradient-green">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>Active Users</h3>
            <p>{stats.activeUsers}</p>
            <div className="stat-trend">
              <TrendingUp size={16} />
              <span>+{(stats.activeUsers / users.length * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="stat-card neon-card">
          <div className="stat-icon gradient-blue">
            <UsersIcon size={24} />
          </div>
          <div className="stat-content">
            <h3>Avg. Age</h3>
            <p>{stats.avgAge}</p>
            <div className="stat-trend">
              <TrendingUp size={16} />
              <span>+2.3%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="users-table glass-card">
        <h2>User Management</h2>
        {loading ? (
          <div className="loading-pulse">
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age || 'N/A'}</td>
                  <td>
                    <span className={`status-indicator ${user.status ? 'active' : 'inactive'}`}>
                      {user.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="delete-btn hover-glow"
                      onClick={() => deleteUser(user._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};