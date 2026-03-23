import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import RegisterDonor from './pages/RegisterDonor';
import DonorList from './pages/DonorList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

// Component to protect private routes
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to the login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Component to redirect logged-in users away from auth pages
const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main style={{ minHeight: '80vh', padding: '0', display: 'flex', flexDirection: 'column' }}>
            <Routes>
              {/* Public Routes - only auth pages */}
              <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
              <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
              <Route path="/forgot-password" element={<AuthRoute><ForgotPassword /></AuthRoute>} />

              {/* Public/Hybrid Routes */}
              <Route path="/" element={<Home />} />

              {/* Protected Routes */}
              <Route path="/donors" element={<ProtectedRoute><DonorList /></ProtectedRoute>} />
              <Route path="/register" element={<ProtectedRoute><RegisterDonor /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            </Routes>
          </main>

          {/* Chatbot only available when logged in (Optional: If auth is required for Chatbot) */}
          <Chatbot />

          <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)', borderTop: '1px solid var(--border)', marginTop: '2rem' }}>
            <p>&copy; 2026 BloodLink. Connecting Donors & Receivers.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
