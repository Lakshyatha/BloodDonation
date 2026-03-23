import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../config/api';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, isLoggedIn } = useAuth();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ city: '', phone: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchDonorProfile();
  }, [user]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const fetchDonorProfile = async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`${API_BASE}/donors/user/${user.id}`);
      setDonor(res.data);
      setFormData({ city: res.data.city, phone: res.data.phone });
    } catch (err) {
      if (err.response?.status !== 404) {
        setStatus({ type: 'error', message: 'Failed to load profile data.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      await axios.put(`${API_BASE}/donors/${donor.id}`, formData);
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
      setIsEditing(false);
      fetchDonorProfile();
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to update profile.' });
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>⏳ Loading your profile...</div>;
  }

  return (
    <div className="profile-page animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>My Profile</h2>
      
      {/* User Details Card */}
      <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{user.name}</h3>
          <p style={{ margin: '0.2rem 0 0', color: 'var(--text-light)' }}>{user.email}</p>
          {user.role === 'ADMIN' && (
            <span style={{ display: 'inline-block', marginTop: '0.5rem', background: '#4F46E5', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              ADMIN
            </span>
          )}
        </div>
      </div>

      {/* Donor Profile Card */}
      <div className="card" style={{ padding: '2.5rem' }}>
        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
          🩸 Donor Status
        </h3>

        {status.message && (
          <div style={{
            padding: '1rem', marginBottom: '1.5rem', borderRadius: 'var(--radius)',
            background: status.type === 'success' ? '#D1FAE5' : '#FEE2E2',
            color: status.type === 'success' ? '#065F46' : '#991B1B'
          }}>
            {status.message}
          </div>
        )}

        {!donor ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>You are not registered as a blood donor yet.</p>
            <Link to="/register" className="btn btn-primary">Become a Donor Now</Link>
          </div>
        ) : (
          <div>
            {!isEditing ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <p style={{ color: 'var(--text-light)', margin: '0 0 0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Blood Group</p>
                  <span className="badge badge-blood" style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>{donor.bloodGroup}</span>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <p style={{ color: 'var(--text-light)', margin: '0 0 0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>City</p>
                  <p style={{ fontSize: '1.2rem', margin: 0, fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ fontSize: '1.5rem' }}>📍</span> {donor.city}</p>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <p style={{ color: 'var(--text-light)', margin: '0 0 0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</p>
                  <p style={{ fontSize: '1.2rem', margin: 0, fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ fontSize: '1.5rem' }}>📞</span> {donor.phone}</p>
                </div>
                <div style={{ width: '100%', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border)' }}>
                  <button className="btn btn-outline" onClick={() => setIsEditing(true)}>✏️ Edit Details</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input type="text" className="form-input" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
