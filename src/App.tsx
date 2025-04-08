import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ListingDetail from './components/ListingDetail';
import CreateListing from './components/CreateListing';
import Equipment from './components/Equipment';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/listings/new" element={<CreateListing />} />
          <Route path="/equipment" element={<Equipment />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;