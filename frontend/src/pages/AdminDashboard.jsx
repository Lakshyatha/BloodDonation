import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../config/api';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { user, isLoggedIn } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, totalDonors: 0, totalRequests: 0 });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn && user?.role === 'ADMIN') {
      fetchData();
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn || user?.role !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  const fetchData = async () => {
    try {
      const [statsRes, donorsRes] = await Promise.all([
        axios.get(`${API_BASE}/admin/stats`),
        axios.get(`${API_BASE}/donors`)
      ]);
      setStats(statsRes.data);
      setDonors(donorsRes.data);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDonor = async (id) => {
    if (!window.confirm('Delete this donor permanently?')) return;
    try {
      await axios.delete(`${API_BASE}/donors/${id}`);
      setDonors(prev => prev.filter(d => d.id !== id));
      setStats(prev => ({ ...prev, totalDonors: prev.totalDonors - 1 }));
    } catch (err) {
      alert('Failed to delete donor.');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>⏳ Loading Dashboard...</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Admin Dashboard</h2>
          <p style={{ color: 'var(--text-light)' }}>System overview and donor management.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>👥</div>
          <div>
            <p style={{ color: 'var(--text-light)', margin: '0 0 0.25rem', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Users</p>
            <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--secondary)', lineHeight: 1 }}>{stats.totalUsers}</h3>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🩸</div>
          <div>
            <p style={{ color: 'var(--text-light)', margin: '0 0 0.25rem', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Donors</p>
            <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--primary)', lineHeight: 1 }}>{stats.totalDonors}</h3>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🔔</div>
          <div>
            <p style={{ color: 'var(--text-light)', margin: '0 0 0.25rem', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Blood Requests</p>
            <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#4338CA', lineHeight: 1 }}>{stats.totalRequests}</h3>
          </div>
        </div>
      </div>

      {/* Donors Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: 'var(--secondary)', fontSize: '1.2rem' }}>Registered Donors Database</h3>
        </div>
        
        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          {donors.length === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>No donors registered yet.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Donor ID</th>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>City</th>
                  <th>Contact</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.map(donor => (
                  <tr key={donor.id}>
                    <td style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontFamily: 'monospace' }}>#{donor.id}</td>
                    <td style={{ fontWeight: '600', color: 'var(--secondary)' }}>{donor.name}</td>
                    <td>
                      <span className="badge badge-blood">{donor.bloodGroup}</span>
                    </td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)' }}>
                        <span style={{ fontSize: '1.2rem' }}>📍</span> {donor.city}
                      </span>
                    </td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)' }}>
                        <span style={{ fontSize: '1.2rem' }}>📞</span> {donor.phone}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDeleteDonor(donor.id)} 
                        className="btn" 
                        style={{ padding: '0.4rem 0.8rem', background: '#FEF2F2', color: '#991B1B', border: '1px solid #FCA5A5', fontSize: '0.85rem' }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
