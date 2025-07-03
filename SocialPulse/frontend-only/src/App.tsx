import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginGoogle from './pages/LoginGoogle';
import LoginFacebook from './pages/LoginFacebook';
import HelpSupport from './pages/Helpsupport';
import Connection from './pages/Connection';
import Campaigns from './pages/Campaigns';
const App: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const  {isAuthenticated }= useAuth();
  console.log(isAuthenticated);
  return (
    <ThemeProvider>
    {isAuthenticated ? (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
        <div className="w-64">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <div className="flex flex-col flex-1">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/loginGoogle" element={<LoginGoogle />} />
              <Route path="/loginFacebook" element={<LoginFacebook />} />
              <Route path="/help" element={<HelpSupport />} />
              <Route path="/connections" element={<Connection />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    ) : (
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )}
</ThemeProvider>

  );
};

export default App;