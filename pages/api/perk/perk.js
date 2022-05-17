// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
// import { features } from "../../../data/feature";

// export default function handler(req, res) {
//   if (req.method === "GET") {
//     res.status(200).json(features)

//   } else if (req.method === "POST") {
//     const perk = req.body.perk
//     const perkID = req.body.perkID
//     const newFeature = {
//       id: perkID,
//       feature: perk
//     }
//     features.push(newFeature)
//     res.status(201).json(newFeature)
//   }
// }

export default async function handler(req, res) {
  //POST: Create new perk
  try {
    const { body: data } = req;
    const prisma = new PrismaClient();
    if (req.method === "POST") {
     // const { body: data } = req;
    var newPerk = await prisma.MerchantStorefront_perks.create({
      data: {
        // id: BigInt(data.id),
        perks: data.perks,
        // price: data.price, // Not used at the moment
        amount: data.amount,
        description: data.description,
        created_at: new Date(),
        updated_at: new Date(),
        
      },
    });

    // Handle BigInt issue (Some fields in PostgreSQL is BigInt, but JS does know BigInt)
    newPerk = JSON.parse(
      JSON.stringify(newPerk, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
    console.log("newPerk", newPerk);
    res.status(200).json(newPerk);
    
   // console.log("newPerk", newPerk);

//    res.status(200).json(newPerk);
    

      } else if (req.method === "DELETE") {
        const { body: data } = req;
        // console.log("Im from front", data.id)
        var deletedPerk = await prisma.MerchantStorefront_perks.delete({
          where: {
            id: BigInt(data.id),
          },
        });
  
        deletedPerk = JSON.parse(
          JSON.stringify(deletedPerk, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );

        res.status(200).json(deletedPerk);
      }
      else if (req.method === "PUT") {
        const { body: data } = req;
        // console.log("Im from front", data.id)
        var updatedPerk = await prisma.MerchantStorefront_perks.update({
          where: {
            id: BigInt(data.id),
          },
          data: {
            // id: BigInt(data.id),
            perks: data.perks,
            price: data.price,
            amount: data.amount,
            description: data.description,
            // created_at: new Date(),
            updated_at: new Date(),
          },
        });
  
        updatedPerk = JSON.parse(
          JSON.stringify(updatedPerk, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        );
        res.status(200).json(updatedPerk);
      }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  //res.status(200).json(data);
  return;
}
