
import uuid from "react-uuid";


export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const {body} = req;
            const trn_id = uuid();
            const total_amount = parseInt(body.total_amount);
            const user_id = parseInt(body.user_id);
            const package_id = parseInt(body.package_id);
            const pay_method = parseInt(body.pay_method);
            const package_type = body.package_type;

            const success_url = `${process.env.PAYMENT_GATE_CALLBACK}api/${package_type}?status=success&trx_id=${trn_id}&total_amount=${total_amount}&user_id=${user_id}&package_id=${package_id}&pay_method=${pay_method}`;

            return res.status(200).send(success_url);
        } catch (e) {
            const package_type = body?.package_type ?? "" ;
            return res.status(200).send(`${process.env.PAYMENT_GATE_CALLBACK}api/${package_type}?status=fail`);
        }
    }
}