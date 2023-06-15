import { lazy } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';
import TransReportIndex from 'src/admin/transreports/TransReportIndex';
import ReporstsData from 'src/admin/transreports/components/SettlementDetailedReport';
import PgControlApi from 'src/pg/services/pglogsservices/PgControlApi';
import PgLogs from 'src/pg/services/pglogsservices/PgLogs';
import PgTransLog from 'src/pg/services/pglogsservices/PgTransLog';
// const TransactionReports = lazy(() => import('src/admin/transreports/components/TransactionReports'));
const AlldeptWiseTrans = lazy(() => import('src/alldept/AlldeptWiseTrans'));
const CumulativeTrans = lazy(() => import('src/alldept/CumulativeTrans'));
const SubdeptTrans = lazy(() => import('src/alldept/SubdeptTrans'));
const TotalTrans = lazy(() => import('src/alldept/TotalTrans'));
const DashboardLayout = lazy(() => import('src/layouts/dashboard/DashboardLayout'));
const SimpleLayout = lazy(() => import('src/layouts/simple/SimpleLayout'));
const DashboardAppPage = lazy(() => import('src/admin/DashboardAppPage'));
const LastTransactions = lazy(() => import('src/admin/LastTransactions'));
const Page404 = lazy(() => import('src/admin/Page404'));
const DiffGOTPage = lazy(() => import('src/admin/servicepages/DiffGOTPage'));
const DiffGOTTrans = lazy(() => import('src/admin/servicepages/DiffGOTTrans'));
const PgIndex = lazy(() => import('src/pg/PgIndex'));
// const PgControlApi = lazy(() => import('src/pg/services/pglogsservices/PgControlApi'));
// const PgLogs = lazy(() => import('src/pg/services/pglogsservices/PgLogs'));
// const PgTransLog = lazy(() => import('src/pg/services/pglogsservices/PgTransLog'));
const GOTPayments = lazy(() => import('src/pg/services/pgtransactionservices/GOTPayments'));
const GOTTransPayments = lazy(() => import('src/pg/services/pgtransactionservices/GOTTransPayments'));
const GOTTranslog = lazy(() => import('src/pg/services/pgtransactionservices/GOTTranslog'));
const GOTTranslogDept = lazy(() => import('src/pg/services/pgtransactionservices/GOTTranslogDept'));

const AdminRoutes = () => {
  const adminRoutes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/admin" />, index: true },
        { path: 'admin', element: <DashboardAppPage /> },
        { path: 'alldept', element: <AlldeptWiseTrans /> },
        { path: 'subdept', element: <SubdeptTrans /> },
        { path: 'totaltrans', element: <TotalTrans /> },
        { path: 'cumulative', element: <CumulativeTrans /> },
        { path: 'diffgot', element: <DiffGOTPage /> },
        { path: 'difftrans', element: <DiffGOTTrans /> },

        {
          path: 'user',
          element: <PgIndex />,
          children: [
            { element: <Navigate to="/dashboard/user" /> },
            { path: 'pglogs', element: <PgLogs /> },
            { path: 'pgtranslog', element: <PgTransLog /> },
            { path: 'controlapi', element: <PgControlApi /> },
            { path: 'gotpayments', element: <GOTPayments /> },
            { path: 'gottranslog', element: <GOTTranslog /> },
            { path: 'gottranslogdept', element: <GOTTranslogDept /> },
            { path: 'gottranspayment', element: <GOTTransPayments /> },
          ],
        },
        {
          path: 'reports',
          element: <TransReportIndex />,
          children: [
            { element: <Navigate to="/dashboard/reports" /> },
            { path: 'allreports', element: <ReporstsData /> },
          ],
        },
        { path: 'lasttransactions', element: <LastTransactions /> },
      ],
    },
    // {
    //   path: 'auth',
    //   element: <AuthLayout />,
    //   children: [
    //     { element: <Navigate to="/auth/login" />, index: true },
    //     { path: 'login', element: <LoginPage /> },
    //   ],
    // },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/admin" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return adminRoutes;
};

export default AdminRoutes;
