import { useSelector } from 'react-redux';
import AdhaarRoutes from './routes/AdhaarRoutes';
import AdminRoutes from './routes/AdminRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import EsevaRoutes from './routes/EsevaRoutes';
import MesevaRoutes from './routes/MesevaRoutes';
import RTARoutes from './routes/RTARoutes';
import StampsRoutes from './routes/StampsRoutes';
import DostRoutes from './routes/DostRoutes';
import TemplesRoutes from './routes/TemplesRoutes';

// ----------------------------------------------------------------------

export default function Router() {
  const stateData = useSelector((state) => state.auth);
  console.log(stateData);

  if (stateData.data.user === 'ADMIN') {
    return <AdminRoutes />;
  } else if (stateData.data.user === 'MESEVA') {
    return <MesevaRoutes />;
  } else if (stateData.data.user === 'AADHAR') {
    return <AdhaarRoutes />;
  } else if (stateData.data.user === 'RTA') {
    return <RTARoutes />;
  } else if (stateData.data.user === 'ESEVA') {
    return <EsevaRoutes />;
  } else if (stateData.data.user === 'STAMPS') {
    return <StampsRoutes />;
  } else if (stateData.data.user === 'TEMPLES') {
    return <TemplesRoutes />;
  } else if (stateData.data.user === 'DOST') {
    return <DostRoutes />;
  } else {
    return <DashboardRoutes />;
  }
}
