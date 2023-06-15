import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { aadharReducer } from 'src/redux/aadhar/AadharReducers';
import { adminReducer } from 'src/redux/admin/AdminReducers';
import { authReducer } from 'src/redux/auth/AuthReducers';
import { dashboardReducer } from 'src/redux/dashboard/dashbordReducers';
import { dostReducer } from 'src/redux/dost/DostReducers';
import { esevaReducer } from 'src/redux/eseva/EsevaReducers';
import { mesevaReducer } from 'src/redux/meseva/MesevaReducers';
import { reportsReducer } from 'src/redux/reports/ReportsReducers';
import { rtaReducer } from 'src/redux/rta/RTAReducers';
import { stampsReducer } from 'src/redux/stamps/StampsReducers';
import { templesReducer } from 'src/redux/temples/TemplesReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  admin: adminReducer,
  aadhar: aadharReducer,
  meseva: mesevaReducer,
  stamps: stampsReducer,
  eseva: esevaReducer,
  rta: rtaReducer,
  dost: dostReducer,
  temples: templesReducer,
  reports: reportsReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
