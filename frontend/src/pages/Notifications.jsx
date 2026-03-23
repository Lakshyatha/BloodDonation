import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../config/api';
import { useAuth } from '../context/AuthContext';

function Notifications() {
  const { isLoggedIn } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
    // Poll every 10 seconds for new requests
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE}/requests`);
      // Sort newest first
      setRequests(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE}/requests/${id}/status`, { status });
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const statusBadge = (status) => {
    const styles = {
      PENDING: { bg: '#FEF3C7', color: '#92400E', label: '⏳ Pending' },
      ACCEPTED: { bg: '#D1FAE5', color: '#065F46', label: '✅ Accepted' },
      DECLINED: { bg: '#FEE2E2', color: '#991B1B', label: '❌ Declined' },
    };
    const s = styles[status] || styles.PENDING;
    return (
      <span style={{
        background: s.bg, color: s.color, padding: '0.3rem 0.75rem',
        borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '600'
      }}>
        {s.label}
      </span>
    );
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="notifications-page animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>🔔 Blood Requests</h2>
          <p style={{ color: 'var(--text-light)', margin: 0 }}>
            {requests.filter(r => r.status === 'PENDING').length} pending request{requests.filter(r => r.status === 'PENDING').length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {loading && (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem' }}>⏳ Loading requests...</p>
        </div>
      )}

      {!loading && requests.length === 0 && (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          <h3>No blood requests yet</h3>
          <p style={{ color: 'var(--text-light)' }}>When someone requests blood, it will appear here.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {requests.map((req, i) => (
          <div key={req.id} className="card animate-slide-up" style={{
            animationDelay: `${i * 50}ms`,
            borderLeft: req.status === 'PENDING' ? '4px solid #F59E0B' :
              req.status === 'ACCEPTED' ? '4px solid #10B981' : '4px solid #EF4444'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div className="blood-badge" style={{ marginBottom: 0, fontSize: '1rem', padding: '0.35rem 0.75rem' }}>{req.bloodGroup}</div>
                  {statusBadge(req.status)}
                  <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{timeAgo(req.createdAt)}</span>
                </div>

                <p style={{ margin: '0.3rem 0', fontWeight: '600', fontSize: '1.05rem' }}>
                  🙋 {req.requesterName} needs help
                </p>
                <p style={{ margin: '0.3rem 0', color: 'var(--text-light)' }}>
                  📍 {req.city} &nbsp;|&nbsp; 📞 Donor: {req.donorPhone}
                </p>
                {req.message && (
                  <p style={{
                    margin: '0.75rem 0 0', padding: '0.75rem', background: '#F9FAFB',
                    borderRadius: 'var(--radius)', color: 'var(--text-dark)', fontSize: '0.9rem',
                    borderLeft: '3px solid var(--primary)'
                  }}>
                    💬 "{req.message}"
                  </p>
                )}
              </div>

              {/* Action Buttons - only for PENDING */}
              {req.status === 'PENDING' && (
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => updateStatus(req.id, 'ACCEPTED')}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: '#059669' }}
                  >
                    ✅ Accept
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => updateStatus(req.id, 'DECLINED')}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderColor: '#EF4444', color: '#EF4444' }}
                  >
                    ❌ Decline
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
