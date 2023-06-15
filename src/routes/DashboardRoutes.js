import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Departments from 'src/dashboard/pages/Departments';
import Services from 'src/dashboard/pages/Services';
const LoginPage = lazy(() => import('src/admin/LoginPage'));
const Page404 = lazy(() => import('src/admin/Page404'));
const Dashboard = lazy(() => import('src/dashboard/Dashboard'));
const AuthLayout = lazy(() => import('src/layouts/auth/AuthLayout'));

const DashLayout = lazy(() => import('src/layouts/dash/DashLayout'));
const SimpleLayout = lazy(() => import('src/layouts/simple/SimpleLayout'));

const DashboardRoutes = () => {
  const dashboardRoutes = useRoutes([
    {
      path: '/sample',
      element: <DashLayout />,
      children: [
        { element: <Navigate to="/sample/dashboard" />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'services', element: <Services /> },
        { path: 'departments', element: <Departments /> },
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [{ element: <Navigate to="/auth/login" /> }, { path: 'login', element: <LoginPage /> }],
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/sample/dashboard" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ]);
  return <>{dashboardRoutes}</>;
};

export default DashboardRoutes;
