import prisma from "/PrismaConnect";
import * as crypto from "crypto";
import uuid from "react-uuid";
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { body } = req;
        console.log(body)

        let {user_id, data} = body;
        user_id = parseInt(user_id);

        for (const i of data) {
            let package_data = i.package;
            let is_paid = i.is_paid;
            let payment_method_data = i.payment_method;

            console.log(package_data)
            console.log(is_paid)
            console.log(payment_method_data)
            // total_amount
            let trx_id = uuid();
            // package_id = parseInt(package_id);
            // payment_method = parseInt(payment_method);
            // total_amount = parseInt(total_amount)
            let package_id = package_data.value;
            let total_amount = package_data.total_price;

            is_paid = is_paid.value;
            let payment_method = payment_method_data.value;

            let serial_number = trx_id.toString() + package_id.toString() + user_id.toString();
            serial_number = crypto.createHash('md5').update(serial_number).digest('hex');
            try {
                await createMerchantPackage(user_id, package_id, serial_number);
                await createPaymentHistory(is_paid, package_id, user_id, trx_id, total_amount, payment_method);
                await createPerkHistory(package_id, user_id, serial_number);

            } catch (e) {
                console.error(e);
                return res.status(400).json(e);
            }

        }
        return res.status(200).json("success");
    } else if (req.method === "GET") {
        try {
            const package_data = await getPackage();
            const payment_method_data = await getPaymentMethod();
            return res.status(200).json({
                package_data: package_data,
                payment_method_data: payment_method_data
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json(e);
        }
    }
}

async function getPackage() {
    let response = await prisma.MerchantStorefront_package.findMany();
    response = JSON.parse(
        JSON.stringify(response, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
    );

    return response.map(v => {
        return {
            value: v.id,
            label: v.package_name,
            total_price: v.price
        }
    });
}

async function getPaymentMethod() {
    let response = await prisma.PaymentsApp_paymentmethod.findMany();
    response = JSON.parse(
        JSON.stringify(response, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
    );

    return response.map(v => {
        return {
            value: v.id,
            label: v.payment_method
        }
    });
}

async function createMerchantPackage(user_id, package_id, serial_number) {
    await prisma.MerchantStorefront_merchantpackage.create({
        data: {
            created_at: new Date(),
            updated_at: new Date(),
            user_id_id: user_id,
            package_id_id: package_id,
            serial_no: serial_number
        }
    }).catch(e => {throw Error(e)});
}

async function createPaymentHistory(isPaid, package_id, user_id, trx_id, total_amount, pay_id){
    await prisma.MerchantStorefront_paymenthistory.create({
        data: {
            status: isPaid,
            remark: null,
            timestamp: new Date(),
            updated_at: new Date(),
            package_id_id: package_id,
            payment_method_id: pay_id,
            user_id_id: user_id,
            trx_id: trx_id,
            amount: total_amount
        }
    }).catch(e => {
        throw Error(e)
    });
}

async function createPerkHistory(package_id, merchant_id, serial_number) {
    let perks = await prisma.MerchantStorefront_perks.findMany({
        where: {
            package_id_id: package_id
        }
    }) || [];
    perks = JSON.parse(JSON.stringify(perks, (key, value) => (typeof value === "bigint" ? parseInt(value) : value)));

    const perk_history = perks.map(perk => {
        const amount_used = 0 ;
        const amount_remain = 10;
        const unit = perk.unit;
        const created_at = new Date();
        const expired_at = new Date()

        expired_at.setFullYear(expired_at.getFullYear() + 1);
        const perk_id = perk.id;
        const recorded_by = merchant_id;

        return {
            amount_used: amount_used,
            amount_remain: amount_remain,
            unit: unit,
            created_at: created_at,
            expired_at: expired_at,
            perk_id: perk_id,
            recorded_by: recorded_by
        }
    });

    for (const perk_data of perk_history) {
        await prisma.MerchantStorefront_merchantperkhistory.create({
            data: {
                serial : serial_number || null,
                amount_used: perk_data.amount_used || 0,
                amount_remain: perk_data.amount_remain || 10,
                unit: perk_data.unit.toString() || null,
                recorded_by_id: perk_data.recorded_by || null,
                created_at: perk_data.created_at,
                expired_at: perk_data.expired_at,
                perk_id_id: perk_data.perk_id || null
            }
        }).catch(e => {
            console.error(e);
            throw Error(e)

        });
    }
}