import prisma from "../../../PrismaConnect";




export default async function handler(req, res) {
    
        
    
    

    try {
        const id = req.query.id;
        
        console.log(id)
        if (req.method == "PATCH" && id != undefined) {
            const int_id = parseInt(id);
            const data = await prisma.MerchantStorefront_messagetoadmin.update({
                where: {
                    id: int_id
                },
                data: {
                    status: req.body.status
                }
            }).catch(err => { throw new Error(err) });

            const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

            return res.status(200).json({
                data: parsedData
            })
        }

        
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
