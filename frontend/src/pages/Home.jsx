import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../config/api';
import { useAuth } from '../context/AuthContext';
import LandingPage from './LandingPage';

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isLoggedIn) {
    return <LandingPage />;
  }

  const handleAction = (callback) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      callback();
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE}/ai/search`, { query: searchQuery });
      setSearchResults(res.data);
    } catch (err) {
      setError('Search failed. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section style={{ padding: '6rem 1rem 4rem', textAlign: 'center', background: 'radial-gradient(circle at top right, var(--primary-light), transparent 40%)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'white', color: 'var(--primary)', border: '1px solid var(--primary-light)', borderRadius: '9999px', fontWeight: '700', fontSize: '0.85rem', marginBottom: '2rem', letterSpacing: '0.05em', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '1.2rem' }}>✨</span> THE FUTURE OF HEALTHCARE
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--secondary)', letterSpacing: '-0.04em', lineHeight: '1.1' }}>
            Save a Life.<br />
            <span style={{ color: 'var(--primary)' }}>Be a Hero Today.</span>
          </h1>
          
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-light)', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 3rem' }}>
            BloodLink connects blood donors directly with those in critical need. Join our premium network of heroes and make a real difference in your local community.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => handleAction(() => navigate('/donors'))}>
              Find Donors Near Me
            </button>
            {!isLoggedIn && (
              <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'white' }} onClick={() => navigate('/signup')}>
                Join the Network
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'white', padding: '3rem 1rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 5vw, 6rem)', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>10k+</h3>
            <p style={{ color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Active Donors</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>50k+</h3>
            <p style={{ color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Lives Saved</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', margin: 0 }}>100%</h3>
            <p style={{ color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Secure & Free</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 1rem', background: 'var(--background)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Why Choose BloodLink?</h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '500px', margin: '0 auto' }}>Our platform is designed to be the fastest, most reliable way to connect in emergencies.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
             {/* Smart AI Search Card */}
            <div className="card" style={{ padding: '2.5rem', gridColumn: '1 / -1', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
               <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🤖</div>
               <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>AI-Powered Smart Search</h3>
               <p style={{ color: 'var(--text-light)', lineHeight: '1.6', maxWidth: '600px', marginBottom: '2rem' }}>
                  Skip the manual filters. Just type what you need naturally: "Find O+ donors in Hyderabad" and let our AI do the matching instantaneously.
               </p>
               
               <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '600px', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                 <input
                   type="text"
                   className="form-input"
                   style={{ flex: '1 1 200px', padding: '1rem 1.5rem', fontSize: '1.1rem', borderRadius: '4px' }}
                   placeholder='Try: "Need B+ blood in Chennai"'
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
                 <button type="submit" className="btn btn-primary" style={{ padding: '1rem 2rem', flex: '0 0 auto', borderRadius: '4px' }} disabled={isLoading}>
                   {isLoading ? '⏳' : (!isLoggedIn ? '🔒 Login to Search' : '🔍 Search')}
                 </button>
               </form>
               
               {error && <p style={{ color: 'var(--primary)', marginTop: '1rem' }}>{error}</p>}
               {searchResults && (
                 <div className="animate-fade-in" style={{ marginTop: '2rem', textAlign: 'left', width: '100%' }}>
                   <div style={{ display: 'inline-block', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: '600', marginBottom: '1.5rem' }}>{searchResults.message}</div>
                   {searchResults.donors?.length > 0 ? (
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                       {searchResults.donors.map(d => (
                         <div key={d.id} className="card" style={{ border: '1px solid var(--border)', boxShadow: 'none' }}>
                           <span style={{ display: 'inline-block', background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '1rem' }}>{d.bloodGroup}</span>
                           <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>{d.name}</h3>
                           <p style={{ margin: '0.25rem 0', color: 'var(--text-light)', fontSize: '0.9rem' }}>📍 {d.city}</p>
                           <p style={{ margin: '0.25rem 0', color: 'var(--text-light)', fontSize: '0.9rem' }}>📞 {d.phone}</p>
                         </div>
                       ))}
                     </div>
                   ) : <p style={{ color: 'var(--text-light)', textAlign: 'center' }}>No donors found. Try a different query.</p>}
                 </div>
               )}
            </div>

            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⚡</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Instant Connections</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Skip the middleman. Request help directly from registered donors in your specific city and get notified instantly.</p>
            </div>
            
            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🛡️</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Verified Donors</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>Every donor profile is secured and tied to an authenticated account, ensuring trust when it matters most.</p>
            </div>
            
            <div className="card" style={{ padding: '2.5rem', background: 'var(--secondary)', color: 'white', borderColor: 'var(--secondary)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🩸</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'white' }}>Become a Donor</h3>
              <p style={{ color: '#94A3B8', lineHeight: '1.6', marginBottom: '1.5rem' }}>Ready to step up? Register your blood type and location in under 2 minutes.</p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }} onClick={() => handleAction(() => navigate('/register'))}>Register Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Alert Generator */}
      <EmergencyAlert isLoggedIn={isLoggedIn} navigate={navigate} />

    </div>
  );
}

function EmergencyAlert({ isLoggedIn, navigate }) {
  const [form, setForm] = useState({ patientName: '', bloodGroup: 'O+', hospitalName: '', city: '', contact: '' });
  const [alert, setAlert] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleOpen = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setIsOpen(true);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/ai/alert`, form);
      setAlert(res.data.alert);
    } catch { setAlert('Failed to generate alert.'); }
  };

  if (!isOpen) {
    return (
      <section style={{ textAlign: 'center', margin: '3rem 1rem' }}>
        <button className="btn btn-primary" onClick={handleOpen} style={{ background: '#991B1B', padding: '1rem 2rem', fontSize: '1.1rem' }}>
          {!isLoggedIn ? '🔒 Login for Emergency Alerts' : '🚨 Emergency Alert Generator'}
        </button>
      </section>
    );
  }

  return (
    <section className="card" style={{ maxWidth: '600px', margin: '3rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#991B1B', margin: 0 }}>🚨 Emergency Blood Alert</h3>
        <button onClick={() => setIsOpen(false)} style={{ color: 'var(--text-light)', fontSize: '1.5rem' }}>✕</button>
      </div>
      <form onSubmit={handleGenerate}>
        {['patientName', 'hospitalName', 'city', 'contact'].map(f => (
          <div className="form-group" key={f}>
            <label className="form-label">{f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
            <input className="form-input" name={f} value={form[f]} onChange={handleChange} required />
          </div>
        ))}
        <div className="form-group">
          <label className="form-label">Blood Group</label>
          <select className="form-select" name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', background: '#991B1B', padding: '0.8rem' }}>Generate Alert</button>
      </form>
      {alert && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '4px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          {alert}
          <button className="btn btn-outline" style={{ marginTop: '1rem', width: '100%', padding: '0.5rem' }} onClick={() => navigator.clipboard.writeText(alert)}>📋 Copy Alert Text</button>
        </div>
      )}
    </section>
  );
}

export default Home;
