import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../config/api';

function ForgotPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid @gmail.com address');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.newPassword.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/reset-password`, {
        email: form.email,
        newPassword: form.newPassword
      });
      
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-layout animate-fade-in">
      <div className="split-left">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Reset Password</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Enter your email to set a new password</p>

          {error && <div style={{ padding: '0.75rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)', background: '#FEE2E2', color: '#991B1B', fontSize: '0.9rem' }}>{error}</div>}
          
          {success ? (
            <div style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: '#D1FAE5', color: '#065F46', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Password Reset Successful!</h3>
              <p>Redirecting you to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Registered Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="you@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-input"
                  placeholder="••••••••"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-light)', fontSize: '0.95rem' }}>
            Remembered your password? <Link to="/login" style={{ fontWeight: '600' }}>Back to Log In</Link>
          </p>
        </div>
      </div>
      
      <div className="split-right">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Secure Reset</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>
          Recover your access quickly and safely so you can get back to saving lives.
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
