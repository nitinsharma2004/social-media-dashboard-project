import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Settings: React.FC = () => {
  const { user, updateProfile, changePassword, deleteAccount,updateProfiledata } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  // Profile form
  const [username, setUsername] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Notifications settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [newFeatures, setNewFeatures] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

const handleButtonClick = (e) => {
  e.preventDefault();
  fileInputRef.current?.click(); 
};

  const handleImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    updateProfile(formData);
  }
  const handlechangedata = async(e:React.FormEvent)=>{
   e.preventDefault();
   console.log("hello")
   updateProfiledata(username,email);
  }
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    changePassword(newPassword);
  };
  
  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'delete my account') {
      alert('Please type "delete my account" to confirm');
      return;
    }
    deleteAccount();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'security'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notifications'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'appearance'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
        </nav>
      </div>
      
      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="stats-card">
            <h3 className="text-lg font-medium mb-4">Profile Information</h3>
            <form className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/3">
                  <div className="flex flex-col items-center">
                    <img
                      src={user?.image || 'https://randomuser.me/api/portraits/men/1.jpg'}
                      alt="Profile"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                      <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                   />
                    <button
                      type="button"
                      className="mt-2 text-sm text-primary hover:underline"
                       onClick={handleButtonClick}
                    >
                      Change Image
                    </button>
                  </div>
                </div>
                <div className="sm:w-2/3 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary" onClick={handlechangedata}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          
          <div className="stats-card">
            <h3 className="text-lg font-medium mb-4">Account Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Permanently delete your account and all of your content.
            </p>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="btn bg-red-600 text-white hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
      
      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="stats-card">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="input-field"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="input-field"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="input-field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </form>
          </div>
          
          <div className="stats-card">
            <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <button className="btn btn-secondary">
              Enable 2FA
            </button>
          </div>
          
          <div className="stats-card">
            <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last active: Just now</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Active
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Chrome on Windows</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last active: 2 days ago</p>
                </div>
                <button className="text-sm text-red-600 hover:underline">
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Notifications Settings */}
      {activeTab === 'notifications' && (
        <div className="stats-card">
          <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications about your account activity via email
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications directly in your browser
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive a weekly summary of your account activity
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={weeklyReports}
                  onChange={() => setWeeklyReports(!weeklyReports)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Features Announcements</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Stay updated on new features and improvements
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={newFeatures}
                  onChange={() => setNewFeatures(!newFeatures)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive promotional emails and special offers
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={marketingEmails}
                  onChange={() => setMarketingEmails(!marketingEmails)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      )}
      
      {/* Appearance Settings */}
      {activeTab === 'appearance' && (
        <div className="stats-card">
          <h3 className="text-lg font-medium mb-4">Theme Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark themes
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
            
          </div>
        </div>
      )}
      
      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-red-600 mb-4">Delete Account</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This action is permanent and cannot be undone. All your data, including profile information,
                social connections, and analytics will be permanently deleted.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type "delete my account" to confirm
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="btn bg-red-600 text-white hover:bg-red-700"
                  disabled={deleteConfirmText !== 'delete my account'}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;