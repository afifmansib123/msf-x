import prisma from "/PrismaConnect";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const data = await updateApprove(req.body);
      if (data != null || data != undefined) {
        return res.status(200).json("successful");
      } else {
        throw new Error("data is null");
      }
    } else {
      throw new Error("Wrong method");
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      error: e,
      result: null,
    });
  }
}

async function updateApprove({ approvelogId, review_string, approval_id, car_id, status }) {

  const lastest_record = await prisma.CarsApp_carapprovallog.findFirst({
    orderBy: {
      created_at: "desc",
    },
    where: {
      car_id_id: car_id,
    },
  });
  const parsed_data = JSON.parse(
    JSON.stringify(lastest_record, (key, value) => (typeof value === "bigint" ? value.toString() : value))
  );

  console.log(parsed_data);

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
  if (status == "A") {
    const car = await prisma.CarsApp_car.update({
      where: {
        id: car_id,
      },
      data: {
        is_active: true,
        car_status: 'A'
      },
    });
    // TODO handle error
  } else if (status == "R") {
    const car = await prisma.CarsApp_car.update({
      where: {
        id: car_id,
      },
      data: {
        is_active: true,
        car_status: 'R'
      },
    });
    // TODO handle error
  }

  return car_approve;
}
