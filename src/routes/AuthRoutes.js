import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
const AuthLayout = lazy(() => import('src/layouts/auth/AuthLayout'));
const SimpleLayout = lazy(() => import('src/layouts/simple/SimpleLayout'));
const LoginPage = lazy(() => import('src/admin/LoginPage'));
const Page404 = lazy(() => import('src/admin/Page404'));

const AuthRoutes = () => {
  const authRoutes = useRoutes([
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { element: <Navigate to="/auth/login" />, index: true },
        { path: 'login', element: <LoginPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/auth/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ]);
  return <>{authRoutes}</>;
};

export default AuthRoutes;
