import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE from '../config/api';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${API_BASE}/requests`);
        const pending = res.data.filter(r => r.status === 'PENDING').length;
        setPendingCount(pending);
      } catch (err) { /* ignore */ }
    };
    fetchCount();
  }, [isLoggedIn]);

  const isActive = (path) => {
    return location.pathname === path ? ' active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span>🩸 Blood</span><span style={{ color: 'var(--secondary)' }}>Link</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link${isActive('/')}`}>Home</Link>
          <Link to="/donors" className={`nav-link${isActive('/donors')}`}>Find Donors</Link>

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', height: '100%' }}>
              <Link to="/notifications" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <span style={{ fontSize: '1.5rem' }}>🔔</span>
                {pendingCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-5px', right: '-8px', background: '#EF4444', color: 'white',
                    borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', fontWeight: 'bold', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {pendingCount}
                  </span>
                )}
              </Link>
              
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', borderRadius: '4px' }}>
                Become a Donor
              </Link>
              
              <div style={{ borderLeft: '1px solid #E5E7EB', height: '30px', margin: '0 0.5rem' }}></div>

              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: '600' }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#FFE4E6', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                {user?.name?.split(' ')[0]}
              </Link>

              {user?.role === 'ADMIN' && (
                <Link to="/admin" className={`nav-link${isActive('/admin')}`}>Admin</Link>
              )}

              <button className="btn btn-outline" onClick={() => setShowLogoutConfirm(true)} style={{ padding: '0.4rem 1rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '100%' }}>
              <Link to="/login" className="nav-link">Log in</Link>
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
            </div>
          )}
        </div>
      </div>

      {showLogoutConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👋</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Logging Out</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Are you sure you want to log out of your BloodLink account?</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-outline" onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1 }}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                setShowLogoutConfirm(false);
                logout();
                navigate('/login');
              }} style={{ flex: 1 }}>Yes, Log Out</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
