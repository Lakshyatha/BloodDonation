import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../config/api';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate email format (Strictly Gmail)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid @gmail.com address');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/signup`, {
        name: form.name,
        email: form.email,
        password: form.password
      });
      if (res.data.success) {
        login(res.data.user);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-layout animate-fade-in">
      <div className="split-left">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Create Account</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Join BloodLink and become a lifesaver</p>

          {error && <div style={{ padding: '0.75rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)', background: '#FEE2E2', color: '#991B1B', fontSize: '0.9rem' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label">Confirm Password</label>
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-light)', fontSize: '0.95rem' }}>
            Already have an account? <Link to="/login" style={{ fontWeight: '600' }}>Sign In</Link>
          </p>
        </div>
      </div>
      
      <div className="split-right">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🩸</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>BloodLink</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', maxWidth: '400px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
          Create an account and start saving lives. Every drop counts.
        </p>
        
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>10K+</div>
            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Donors</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>100%</div>
            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Secure</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
