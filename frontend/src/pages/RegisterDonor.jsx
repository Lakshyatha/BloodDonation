import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../config/api';
import { useAuth } from '../context/AuthContext';

function RegisterDonor() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bloodGroup: 'A+',
    phone: '',
    city: '',
    userId: user?.id || null
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    // Basic validation
    if (!formData.name || !formData.phone || !formData.city) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE}/donors`, formData);
      setStatus({ type: 'success', message: '✅ Successfully registered as a donor! Redirecting...' });
      setTimeout(() => navigate('/donors'), 2000);
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.error || error.message || 'Unknown error';
      setStatus({ type: 'error', message: `❌ Registration failed: ${msg}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="glass" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🩸</div>
          <h2>Become a Donor</h2>
          <p style={{ color: 'var(--text-light)' }}>Join our community and help save lives</p>
        </div>

        {status.message && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: 'var(--radius)',
            background: status.type === 'success' ? '#D1FAE5' : '#FEE2E2',
            color: status.type === 'success' ? '#065F46' : '#991B1B',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="E.g. Lakshya Kumar"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Blood Group</label>
            <select
              name="bloodGroup"
              className="form-select"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              {bloodGroups.map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
            />
          </div>

          <div className="form-group">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-input"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="E.g. Hyderabad"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
            {isLoading ? 'Registering...' : '❤️ Register as Donor'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterDonor;
