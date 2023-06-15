import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

const DostDashboard = lazy(() => import('src/dost/DostDashboard'));
const Page404 = lazy(() => import('src/admin/Page404'));
const DashboardLayout = lazy(() => import('src/layouts/dashboard/DashboardLayout'));
const SimpleLayout = lazy(() => import('src/layouts/simple/SimpleLayout'));

const DostRoutes = () => {
  const dostRoutes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/dost" />, index: true },
        { path: 'dost', element: <DostDashboard /> },

        // {
        //   path: 'user',
        //   element: <PgIndex />,
        //   children: [
        //     { element: <Navigate to="/dashboard/user" /> },
        //     { path: 'pglogs', element: <PgLogs /> },
        //     { path: 'pgtranslog', element: <PgTransLog /> },
        //     { path: 'controlapi', element: <PgControlApi /> },
        //     { path: 'gotpayments', element: <GOTPayments /> },
        //     { path: 'gottranslog', element: <GOTTranslog /> },
        //     { path: 'gottranslogdept', element: <GOTTranslogDept /> },
        //     { path: 'gottranspayment', element: <GOTTransPayments /> },
        //   ],
        // },
        // { path: 'lasttransactions', element: <LastTransactions /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/dost" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return dostRoutes;
};

export default DostRoutes;
