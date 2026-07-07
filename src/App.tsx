import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AdminLoginPage } from './admin/AdminLoginPage';
import { Layout } from './components/Layout';
import { AdminOverview } from './admin/AdminOverview';
import { AlertManagement } from './admin/AlertManagement';
import { UserManagement } from './components/UserManagement';
import { AdminAnalytics } from './admin/AdminAnalytics';
import { AdminSettings } from './admin/AdminSettings';
import {LoginPage} from './components/LoginPage';
import { UserHome } from './components/UserHome';
import { UserNotifications } from './components/UserNotifications';
import { UserProfile } from './components/UserProfile';
import { Role } from './types';

interface StoredAuth {
  isLoggedIn: boolean;
  userRole: Role;
  userName: string;
}

const AUTH_STORAGE_KEY = 'unialert-auth';

const getRouteFromPath = (role: Role, path: string) => {
  const segments = path.split('/').filter(Boolean);
  const page = segments[segments.length - 1];
  const adminPaths = ['overview', 'alerts', 'users', 'analytics', 'settings'];
  const userPaths = ['feed', 'notifications', 'profile'];
  const validPaths = role === 'Admin' ? adminPaths : userPaths;

  if (!page || page === 'admin' || page === 'user') {
    return role === 'Admin' ? 'overview' : 'feed';
  }

  return validPaths.includes(page) ? page : (role === 'Admin' ? 'overview' : 'feed');
};

const buildRoutePath = (role: Role, path: string) => {
  const basePath = role === 'Admin' ? '/admin' : '/user';
  return `${basePath}/${path}`;
};

const getStoredAuth = (): StoredAuth | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as Partial<StoredAuth>;
    if (parsed.isLoggedIn && parsed.userRole && typeof parsed.userName === 'string') {
      return {
        isLoggedIn: true,
        userRole: parsed.userRole as Role,
        userName: parsed.userName,
      };
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return null;
};

const saveStoredAuth = (auth: StoredAuth) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  }
};

const clearStoredAuth = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

const AppShell = ({
  userRole,
  userName,
  onLogout,
  isLoggedIn,
}: {
  userRole: Role;
  userName: string;
  onLogout: () => void;
  isLoggedIn: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = getRouteFromPath(userRole, location.pathname);

  const handleNavigate = (path: string) => {
    navigate(buildRoutePath(userRole, path));
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
    }

    switch (activePath) {
      case 'feed': return <UserHome />;
      case 'notifications': return <UserNotifications />;
      case 'profile': return <UserProfile userName={userName} role={userRole} />;
      default: return <UserHome />;
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout
      userRole={userRole}
      onLogout={onLogout}
      activePath={activePath}
      onNavigate={handleNavigate}
      userName={userName}
    >
      {renderContent()}
    </Layout>
  );
};

export default function App() {
  const persistedAuth = getStoredAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(persistedAuth?.isLoggedIn ?? false);
  const [userRole, setUserRole] = useState<Role>(persistedAuth?.userRole ?? 'Staff');
  const [userName, setUserName] = useState(persistedAuth?.userName ?? '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      clearStoredAuth();
      return;
    }

    saveStoredAuth({ isLoggedIn, userRole, userName });
  }, [isLoggedIn, userRole, userName]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const expectedPath = buildRoutePath(userRole, getRouteFromPath(userRole, window.location.pathname));
    if (window.location.pathname !== expectedPath) {
      navigate(expectedPath, { replace: true });
    }
  }, [isLoggedIn, userRole, navigate]);

  const handleAdminLogin = (name: string) => {
    setUserRole('Admin');
    setUserName(name);
    setIsLoggedIn(true);
    navigate('/admin/overview', { replace: true });
  };

  const handleLogin = (role: Role, name: string) => {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
    navigate('/user/feed', { replace: true });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('Staff');
    setUserName('');
    navigate('/', { replace: true });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to={userRole === 'Admin' ? '/admin/overview' : '/user/feed'} replace /> : <AdminLoginPage onLogin={handleAdminLogin} />}
      />
      <Route
        path="/user/login"
        element={<LoginPage onLogin={handleLogin} />}
      />
      <Route
        path="/*"
        element={
          <AppShell
            userRole={userRole}
            userName={userName}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
        }
      />
    </Routes>
  );
}
