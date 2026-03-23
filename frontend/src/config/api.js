// API Base URL — uses environment variable for production, fallback to localhost for development
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8082';

export default API_BASE;
