import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { CompanyProvider } from './contexts/CompanyContext';
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy-loaded components
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const CompanyLogin = lazy(() => import('./pages/auth/CompanyLogin'));
const CompanyRegister = lazy(() => import('./pages/auth/CompanyRegister'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Applications = lazy(() => import('./pages/applications/Applications'));
const NewApplication = lazy(() => import('./pages/applications/NewApplication'));
const ApplicationDetails = lazy(() => import('./pages/applications/ApplicationDetails'));
const Interviews = lazy(() => import('./pages/interviews/Interviews'));
const Documents = lazy(() => import('./pages/documents/Documents'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const CompanyDashboard = lazy(() => import('./pages/company/CompanyDashboard'));
const CompanyApplications = lazy(() => import('./pages/company/CompanyApplications'));
const CompanyApplicationDetails = lazy(() => import('./pages/company/CompanyApplicationDetails'));
const JobForm = lazy(() => import('./pages/company/JobForm'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <CompanyProvider>
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/company/login" element={<CompanyLogin />} />
            <Route path="/company/register" element={<CompanyRegister />} />
          </Route>

          {/* Protected routes */}
          <Route element={<Layout />}>
            {/* User routes */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/applications" 
              element={isAuthenticated ? <Applications /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/applications/new" 
              element={isAuthenticated ? <NewApplication /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/applications/:id" 
              element={isAuthenticated ? <ApplicationDetails /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/interviews" 
              element={isAuthenticated ? <Interviews /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/documents" 
              element={isAuthenticated ? <Documents /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
            />
          </Route>

          {/* Company routes with separate layout */}
          <Route element={<Layout isCompanyLayout />}>
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/applications" element={<CompanyApplications />} />
            <Route path="/company/applications/:id" element={<CompanyApplicationDetails />} />
            <Route path="/company/jobs/new" element={<JobForm />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CompanyProvider>
    </Suspense>
  );
}

export default App;