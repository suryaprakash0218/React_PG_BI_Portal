import axios from 'axios';
import { envrinmentURLMSSQL } from 'src/environmentUrl';

class BioTransServices {
  getBioTransSuccess = async () => {
    let res = await axios.get(`${envrinmentURLMSSQL}/biotrans`);
    return res;
  };
  getDifffromgotpayments = async () => {
    let res = await axios.get(`${envrinmentURLMSSQL}/getdifffromgotpayments`);
    return res;
  };
}

export default new BioTransServices();
