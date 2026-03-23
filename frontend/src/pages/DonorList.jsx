import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../config/api';
import { useAuth } from '../context/AuthContext';

function DonorList() {
  const { user, isLoggedIn } = useAuth();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterGroup, setFilterGroup] = useState('');
  const [filterCity, setFilterCity] = useState('');

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', bloodGroup: '', phone: '', city: '' });

  // Request Help state
  const [requestModal, setRequestModal] = useState(null); // donor object or null
  const [requestForm, setRequestForm] = useState({ requesterName: '', message: '' });
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    fetchDonors();
  }, [filterGroup, filterCity]);

  const fetchDonors = async () => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = `${API_BASE}/donors`;

      if (filterGroup && !filterCity) {
        endpoint = `${API_BASE}/donors/blood/${encodeURIComponent(filterGroup)}`;
      } else if (filterCity && !filterGroup) {
        endpoint = `${API_BASE}/donors/city/${encodeURIComponent(filterCity)}`;
      } else if (filterGroup && filterCity) {
        const res = await axios.get(`${API_BASE}/donors`);
        const filtered = res.data.filter(d =>
          d.bloodGroup === filterGroup &&
          d.city.toLowerCase().includes(filterCity.toLowerCase())
        );
        setDonors(filtered);
        setLoading(false);
        return;
      }

      const res = await axios.get(endpoint);
      setDonors(res.data);
    } catch (err) {
      setError('Failed to fetch donors. Make sure the backend is running on port 8082.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/donors/${id}`);
      setDonors(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete donor: ' + (err.response?.data?.message || err.message));
    }
  };

  const startEditing = (donor) => {
    setEditingId(donor.id);
    setEditForm({ name: donor.name, bloodGroup: donor.bloodGroup, phone: donor.phone, city: donor.city });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${API_BASE}/donors/${id}`, editForm);
      setEditingId(null);
      fetchDonors();
    } catch (err) {
      alert('Failed to update donor');
    }
  };

  // Request Help handlers
  const openRequestModal = (donor) => {
    setRequestModal(donor);
    setRequestForm({ requesterName: user?.name || '', message: '' });
    setRequestSuccess('');
  };

  const closeRequestModal = () => {
    setRequestModal(null);
    setRequestForm({ requesterName: '', message: '' });
    setRequestSuccess('');
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!requestForm.requesterName.trim()) {
      alert('Please enter your name');
      return;
    }

    setRequestLoading(true);
    try {
      const payload = {
        requesterName: requestForm.requesterName,
        bloodGroup: requestModal.bloodGroup,
        city: requestModal.city,
        donorPhone: requestModal.phone,
        message: requestForm.message || `Urgent need for ${requestModal.bloodGroup} blood in ${requestModal.city}. Please help!`
      };
      const res = await axios.post(`${API_BASE}/requests`, payload);
      if (res.data.success) {
        setRequestSuccess(res.data.message);
        setTimeout(() => closeRequestModal(), 2500);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Find a Donor</h2>
          <p style={{ color: 'var(--text-light)' }}>Connect directly with registered blood donors in your city.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select className="form-input" style={{ width: 'auto', minWidth: '150px' }} value={filterGroup} onChange={(e) => setFilterGroup(e.target.value)}>
            <option value="">All Blood Groups</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          <input 
            type="text" 
            placeholder="Search by city..." 
            className="form-input"
            style={{ width: 'auto', minWidth: '200px' }}
            value={filterCity} 
            onChange={(e) => setFilterCity(e.target.value)} 
          />
        </div>
      </div>

      {/* Status Messages */}
      {loading && (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem' }}>⏳ Loading donors...</p>
        </div>
      )}
      {error && (
        <div className="glass" style={{ padding: '2rem', textAlign: 'center', background: '#FEF2F2' }}>
          <p style={{ color: '#991B1B' }}>{error}</p>
        </div>
      )}

      {!loading && !error && donors.length === 0 && (
        <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3>No donors found</h3>
          <p style={{ color: 'var(--text-light)' }}>Try adjusting your filters or be the first to register!</p>
        </div>
      )}

      {/* Donor Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {donors.map((donor, index) => (
          <div key={donor.id} className="card animate-slide-up" style={{ animationDelay: `${index * 50}ms`, display: 'flex', flexDirection: 'column' }}>
            {editingId === donor.id ? (
              /* Inline Edit Form */
              <div>
                <input className="form-input" style={{ marginBottom: '0.5rem' }} value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" />
                <select className="form-select" style={{ marginBottom: '0.5rem' }} value={editForm.bloodGroup}
                  onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}>
                  {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
                <input className="form-input" style={{ marginBottom: '0.5rem' }} value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} placeholder="Phone" />
                <input className="form-input" style={{ marginBottom: '0.5rem' }} value={editForm.city}
                  onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} placeholder="City" />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.85rem' }} onClick={() => handleUpdate(donor.id)}>Save</button>
                  <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.85rem' }} onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              /* Normal Display */
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span className="badge badge-blood">{donor.bloodGroup}</span>
                  {(user?.role === 'ADMIN' || user?.id === donor.userId) && (
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button onClick={() => startEditing(donor)} title="Edit" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>✏️</button>
                      <button onClick={() => handleDelete(donor.id)} title="Delete" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>🗑️</button>
                    </div>
                  )}
                </div>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', color: 'var(--secondary)' }}>{donor.name}</h3>
                <p style={{ margin: '0.25rem 0', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>📍</span> {donor.city}
                </p>
                <p style={{ margin: '0.25rem 0', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>📞</span> {donor.phone}
                </p>

                {user?.id !== donor.userId && (
                  <button
                    className="btn btn-primary"
                    onClick={() => openRequestModal(donor)}
                    style={{ width: '100%', marginTop: '1rem', fontSize: '0.9rem', padding: '0.65rem 1rem' }}
                  >
                    🆘 Request Help
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Request Help Modal */}
      {requestModal && (
        <div className="modal-overlay" onClick={closeRequestModal}>
          <div className="modal-content glass animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0 }}>🆘 Request Blood Help</h3>
              <button onClick={closeRequestModal} style={{ fontSize: '1.5rem', color: 'var(--text-light)', cursor: 'pointer' }}>✕</button>
            </div>

            {requestSuccess ? (
              <div className="modal-success">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ color: '#065F46' }}>{requestSuccess}</h3>
                <p style={{ color: 'var(--text-light)' }}>The donor will be contacted shortly.</p>
              </div>
            ) : (
              <>
                {/* Donor Info Card */}
                <div className="modal-donor-info">
                  <div className="blood-badge" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{requestModal.bloodGroup}</div>
                  <strong>{requestModal.name}</strong>
                  <span style={{ color: 'var(--text-light)' }}>📍 {requestModal.city} &nbsp;|&nbsp; 📞 {requestModal.phone}</span>
                </div>

                <form onSubmit={handleRequestSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your name"
                      value={requestForm.requesterName}
                      onChange={(e) => setRequestForm({ ...requestForm, requesterName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message (optional)</label>
                    <textarea
                      className="form-input"
                      placeholder={`Urgent need for ${requestModal.bloodGroup} blood in ${requestModal.city}. Please help!`}
                      value={requestForm.message}
                      onChange={(e) => setRequestForm({ ...requestForm, message: e.target.value })}
                      rows={3}
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={requestLoading}
                    style={{ width: '100%', background: '#991B1B', boxShadow: '0 4px 14px rgba(153,27,27,0.4)' }}>
                    {requestLoading ? '⏳ Sending...' : '🚨 Send Blood Request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DonorList;
