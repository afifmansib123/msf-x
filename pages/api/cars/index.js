/**
 * Sample Car API
 */
import prisma from "../../../PrismaConnect";

export default async function handler(req, res) {
  const {page, status, searchTitle, searchState} = req.query;
  // console.log(status)
  try {
    const data = await getCarList(parseInt(page), status, searchTitle, searchState);
    return res.status(200).json(data);
  } catch(e) {
    console.error(e)
    return res.status(200).json([]);
  }

}

async function getCarList(page, status, searchTitle, searchState) {
  let cars;
  status = JSON.parse(status);
  searchState = JSON.parse(searchState);
  if (page === 1){
    cars = await prisma.CarsApp_carapprovallog.findMany({
      take:20,
      orderBy: {
        id: 'asc'
      },
      where: filtering(status),
      include: {
        CarsApp_car: {
          include: {
            CarsApp_carmanufacturer: true,
            CarsApp_carmodel: true,
            UsersApp_customuser: true
          }
        }
      }
    });
  } else {
    cars = await prisma.CarsApp_carapprovallog.findMany({
      skip: ((page - 1) * 20),
      take:20,
      where: filtering(status),
      orderBy: {
        id: 'asc'
      },
      include: {
        CarsApp_car: {
          include: {
            CarsApp_carmanufacturer: true,
            CarsApp_carmodel: true,
            UsersApp_customuser: true
          }
        }
      }
    });
  }

  cars = JSON.parse(
      JSON.stringify(cars, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
  ) || [];

  cars = cars.map(async v => {
    let first_name = "UNKNOWN";
    let last_name = "NAME";
    let img = '';
    let store_name = '-';

    if (v.CarsApp_car?.UsersApp_customuser) {
      first_name = v.CarsApp_car?.UsersApp_customuser?.first_name;
      last_name = v.CarsApp_car?.UsersApp_customuser?.last_name
    }

    if (v.CarsApp_car?.id) {
      img = await prisma.CarsApp_carimage.findMany({
        where: {
          car_id: Number(v.CarsApp_car.id),
        },
        select: {
          image_url: true,
        },
      }).then((imgResponse) => {
        const img = imgResponse.map((v) => {
          return v.image_url;
        });
        return img;
      }).catch((err) => {throw new Error(err);});
    }

    if (v.CarsApp_car?.UsersApp_customuser?.id) {
      let userStore = await prisma.MerchantStorefront_store.findFirst({
        where: {
          owner_user_id: BigInt(v.CarsApp_car.UsersApp_customuser?.id),
        },
      }).catch(e => {
        throw new Error(e)
      });

      userStore = JSON.parse(
          JSON.stringify(userStore, (key, value) => (typeof value === "bigint" ? parseInt(value) : value))
      );
      store_name = userStore?.name;
    }

    return {
      car: v.CarsApp_car,
      img: img,
      status: v.status,
      first_name: first_name,
      last_name: last_name,
      store: store_name
    }
  });

  cars = Promise.all(cars.map((item) => item));
  cars = await cars;

  return {
    cars: cars,
  }
}

function filtering(status) {
  let filterJson = {};
  let statusArr = [];
  if(status.Approved) {
    statusArr.push("A")
  }

  if (status.Rejected) {
    statusArr.push("R")
  }

  if (status.Pending) {
    statusArr.push("P")
  }

  if(statusArr.length > 0) {
    filterJson = {
      status : {
        in: statusArr
      }
    }
  }

  return filterJson
}

function filterMerchant(searchText, searchState){
  if (searchText.trim() === "") return {}
  if (searchState.MerchantName) {
    return {
      OR: [
        {
          first_name: {
            contains: searchText
          }
        },
        {
          last_name: {
            contains: searchText
          }
        }
      ]
    }
  }
  return {}
}




