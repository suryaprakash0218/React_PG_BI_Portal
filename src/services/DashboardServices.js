import axios from 'axios';
import { environmentURLMYSQL } from 'src/environmentUrl';


class DashboardServises {
  getpaymetdata = async () => {
    let res = await axios.get(`${environmentURLMYSQL}/getpayments`);
    return res;
  };
  getYesterdayPaymetdata = async () => {
    let res = await axios.get(`${environmentURLMYSQL}/getyesterdaypayments`);
    return res;
  };
  getMonthlyData = async () => {
    let res = await axios.get(`${environmentURLMYSQL}/getmonthlypayments`);
    return res;
  };
  getDepartmentwiseData = async () => {
    let res = await axios.get(`${environmentURLMYSQL}/getdepartmentwisepayments`);
    return res;
  };
  getLastTransaction() {
    return axios.get(`${environmentURLMYSQL}/getlasttentransactions`);
  }



 
}

export default new DashboardServises();
