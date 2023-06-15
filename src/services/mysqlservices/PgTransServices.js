import axios from 'axios';
import { environmentURLMYSQL } from 'src/environmentUrl';

class PgTransServices {
  getPgTransControlapiAll = async (data) => {
    const res = await axios.post(`${environmentURLMYSQL}/pglogscontrolapi`, data);
    return res;
  };

  getPgLogsAll = async (data) => {
    const res = await axios.post(`${environmentURLMYSQL}/pglogs`, data);
    return res;
  };
  getPgTransLogsAll = async (data) => {
    const res = await axios.post(`${environmentURLMYSQL}/pgtranslogs`, data);
    return res;
  };
}

export default new PgTransServices();
