import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
const Page404 = lazy(() => import('src/admin/Page404'));
const DashboardLayout = lazy(() => import('src/layouts/dashboard/DashboardLayout'));
const SimpleLayout = lazy(() => import('src/layouts/simple/SimpleLayout'));
const MesevaDashboard = lazy(() => import('src/meseva/MesevaDashboard'));

const MesevaRoutes = () => {
  const esevaRoutes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/meseva" />, index: true },
        { path: 'meseva', element: <MesevaDashboard /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/meseva" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
  return esevaRoutes;
};

export default MesevaRoutes;
