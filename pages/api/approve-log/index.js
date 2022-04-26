import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() ;

export default async function handler(req, res) {
    if(req.method == "POST") {
        res.status(200).json({
            name: "hello log post"
        });
    }
    if(req.method == "GET") {
        try {
            const data = await getAllApprove()
            return res.status(200).json({
                error: null,
                result: data
            });
        } catch(e) {
            return res.status(400).json({
                error: e,
                result: null
            })
        }
    }
}

async function createData() {

}

async function getAllApprove() {
    const data = await prisma.CarsApp_carapprovallog.findMany({
        where: {
          is_approved: false
        },
        select: {
          id: true,
          UsersApp_customuser: {
            select: {
              first_name: true,
              last_name: true
            }
          },
          CarsApp_car: {
            select: {
              CarsApp_carmanufacturer: {
                select: {
                  maker_name: true
                }
              },
              CarsApp_carmodel: {
                select: {
                  model_name: true
                }
              },
              CarsApp_carimage: {
                select: {
                  image_url: true
                }
              }
            }
          }
        },
    
      }).catch(err => {throw new Error(err)});

      const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

      const endResultData = parsedData != undefined?(parsedData.map(value => {
          const first_name = value.UsersApp_customuser.first_name;
          const last_name = value.UsersApp_customuser.last_name;
          const img = value.CarsApp_car.CarsApp_carimage.image_url == undefined ? "" : value.CarsApp_car.CarsApp_carimage.image_url
          console.log(value.CarsApp_car.CarsApp_carimage.image_url)
          return { 
              id: value.id,
              carModel: value.CarsApp_car.CarsApp_carmodel.model_name,
              carImage: img,
              carMaker: value.CarsApp_car.CarsApp_carmanufacturer.maker_name,
              merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`
          }
      })) : []
      return endResultData
}