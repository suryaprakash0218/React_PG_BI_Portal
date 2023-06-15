import axios from "axios";
import { envrinmentURLMSSQL } from "src/environmentUrl";

class PaymentTransService{

    getGOTTransSuccess = async () => {
        let res = await axios.get(`${envrinmentURLMSSQL}/pggottranstotal`);
        return res;
      };

      getDifffrompaymenttrans = async () => {
        let res = await axios.get(`${envrinmentURLMSSQL}/getdifffromgotpayments`);
        return res;
      };
}


export default new PaymentTransService();