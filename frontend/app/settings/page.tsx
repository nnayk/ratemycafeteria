'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { log } from '../utils/logger';
import ResetPasswordModal from '../components/ResetPasswordModal';

const SettingsSidebar = () => {
  const [selectedOption, setSelectedOption] = useState('settings');
  const { user, isLoggedIn } = useAuth();
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 py-6 px-4 border-r border-yellow-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-600">My Account</h2>
            <p className="text-gray-600">{user?.email || 'No email available'}</p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => handleOptionClick('settings')}
              className={`block w-full text-left py-2 px-4 rounded-md transition-colors duration-200 ${
                selectedOption === 'settings'
                  ? 'bg-yellow-400 text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-yellow-200 hover:text-gray-900'
              }`}
            >
              Settings
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {selectedOption === 'settings' && (
            <div className="max-w-md">
              <button
                className="bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsResetPasswordOpen(true)}
              >
                Reset Password
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* Reset Password Modal */}
      <ResetPasswordModal isOpen={isResetPasswordOpen} onClose={() => setIsResetPasswordOpen(false)} />
    </div>
  );
};

export default SettingsSidebar;

