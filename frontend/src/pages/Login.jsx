import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../config/api';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
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

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, form);
      if (res.data.success) {
        login(res.data.user);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-layout animate-fade-in">
      <div className="split-left">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Sign in to your BloodLink account</p>

          {error && <div style={{ padding: '0.75rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)', background: '#FEE2E2', color: '#991B1B', fontSize: '0.9rem' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
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
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <Link to="/forgot-password" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '500' }}>Forgot password?</Link>
              </div>
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
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-light)', fontSize: '0.95rem' }}>
            Don't have an account? <Link to="/signup" style={{ fontWeight: '600' }}>Create one</Link>
          </p>
        </div>
      </div>
      
      <div className="split-right">
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🩸</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>BloodLink</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', maxWidth: '400px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
          Join thousands of heroes saving lives every day through blood donation.
        </p>
        
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>10K+</div>
            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Donors</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>50+</div>
            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>Cities</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
