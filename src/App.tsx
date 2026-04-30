/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { Layout } from './components/Layout';
import { AdminOverview } from './components/AdminOverview';
import { AlertManagement } from './components/AlertManagement';
import { UserManagement } from './components/UserManagement';
import { AdminAnalytics } from './components/AdminAnalytics';
import { AdminSettings } from './components/AdminSettings';
import { UserHome } from './components/UserHome';
import { UserNotifications } from './components/UserNotifications';
import { UserProfile } from './components/UserProfile';
import { Role } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<Role>('Guest');
  const [userName, setUserName] = useState('');
  const [activePath, setActivePath] = useState('overview');

  // Set default active path based on role on login
  useEffect(() => {
    if (isLoggedIn) {
      if (userRole === 'Admin') {
        setActivePath('overview');
      } else {
        setActivePath('feed');
      }
    }
  }, [isLoggedIn, userRole]);

  const handleLogin = (role: Role, name: string) => {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('Guest');
    setUserName('');
  };

  const renderContent = () => {
    if (userRole === 'Admin') {
      switch (activePath) {
        case 'overview': return <AdminOverview />;
        case 'alerts': return <AlertManagement />;
        case 'users': return <UserManagement />;
        case 'analytics': return <AdminAnalytics />;
        case 'settings': return <AdminSettings />;
        default: return <AdminOverview />;
      }
    } else {
      switch (activePath) {
        case 'feed': return <UserHome />;
        case 'notifications': return <UserNotifications />;
        case 'profile': return <UserProfile userName={userName} role={userRole} />;
        default: return <UserHome />;
      }
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Layout 
      userRole={userRole} 
      onLogout={handleLogout} 
      activePath={activePath} 
      onNavigate={setActivePath}
      userName={userName}
    >
      {renderContent()}
    </Layout>
  );
}
