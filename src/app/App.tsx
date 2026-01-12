import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { RegistrationPage } from './components/RegistrationPage';
import { ThankYouPage } from './components/ThankYouPage';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { projectId, publicAnonKey } from '/utils/supabase/info';

type Page = 'landing' | 'registration' | 'thankyou' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [accessToken, setAccessToken] = useState<string>('');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = (token: string) => {
    setAccessToken(token);
    navigateTo('admin-dashboard');
  };

  const handleLogout = () => {
    setAccessToken('');
    navigateTo('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' && (
        <LandingPage
          onNavigateToRegistration={() => navigateTo('registration')}
          onNavigateToAdmin={() => navigateTo('admin-login')}
        />
      )}
      {currentPage === 'registration' && (
        <RegistrationPage
          onSuccess={() => navigateTo('thankyou')}
          onBack={() => navigateTo('landing')}
        />
      )}
      {currentPage === 'thankyou' && (
        <ThankYouPage onBackToHome={() => navigateTo('landing')} />
      )}
      {currentPage === 'admin-login' && (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onBack={() => navigateTo('landing')}
        />
      )}
      {currentPage === 'admin-dashboard' && (
        <AdminDashboard
          accessToken={accessToken}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}