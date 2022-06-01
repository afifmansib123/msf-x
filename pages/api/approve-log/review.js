import prisma from "/PrismaConnect";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      await updateApprove(req.body);
      return res.status(200).json("successful");
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      error: e,
      result: null,
    });
  }
}

async function updateApprove({ approvelogId, review_string, approval_id, id, status, type }) {
  if (type === "car") {
    await updateCar(approvelogId, review_string, approval_id, id, status);
  } else {
    await updateBike(approvelogId, review_string, approval_id, id, status);
  }

}

async function updateCar(approvelogId, review_string, approval_id, car_id, status) {
  // const lastest_record = await prisma.CarsApp_carapprovallog.findFirst({
  //   orderBy: {
  //     created_at: "desc",
  //   },
  //   where: {
  //     car_id_id: car_id,
  //   },
  // });
  // const parsed_data = JSON.parse(
  //     JSON.stringify(lastest_record, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  // );
  //
  // console.log(parsed_data);

  const car_approve = await prisma.CarsApp_carapprovallog.update({
    where: {
      id: parseInt(approvelogId),
    },
    data: {
      is_approved: true,
      updated_at: new Date(),
      approved_by_id: approval_id,
      review: review_string,
      status: status,
    },
  }).catch((err) => {
    throw new Error(err);
  });

  console.log(car_approve)

  // If status is "A"
  // Also update the car is_active = true
  if (status === "A") {
    const car = await prisma.CarsApp_car.update({
      where: {
        id: car_id,
      },
      data: {
        is_active: true,
        car_status: 'A'
      },
    }).catch((e) => {
      console.error(e);
      throw new Error(e);
    });
    // TODO handle error
  } else if (status === "R") {
    const car = await prisma.CarsApp_car.update({
      where: {
        id: car_id,
      },
      data: {
        is_active: true,
        car_status: 'R'
      },
    }).catch((e) => {
      console.error(e);
      throw new Error(e);
    });
    // TODO handle error
  }
}

async function updateBike(approvelogId, review_string, approval_id, bike_id, status) {
  await prisma.BikesApp_bikeapprovallog.update({
    where: {
      id: parseInt(approvelogId),
    },
    data: {
      is_approved: true,
      updated_at: new Date(),
      approved_by_id: approval_id,
      review: review_string,
      status: status,
    },
  }).catch((err) => {
    throw new Error(err);
  });

  // If status is "A"
  // Also update the car is_active = true
  if (status === "A") {
    await prisma.BikesApp_bike.update({
      where: {
        id: bike_id,
      },
      data: {
        is_active: true,
        bike_status: 'A'
      },
    }).catch((e) => {
      console.error(e);
      throw new Error(e);
    });

  } else if (status === "R") {
    await prisma.BikesApp_bike.update({
      where: {
        id: bike_id,
      },
      data: {
        is_active: true,
        bike_status: 'R'
      },
    }).catch((e) => {
      console.error(e);
      throw new Error(e);
    });

  }
}
