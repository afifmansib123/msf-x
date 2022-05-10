import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {useRouter} from 'next/router'
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CarTable from '../../../components/Table/ApproveTable';
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import prisma from "../../../PrismaConnect";
import {getPending} from "../../api/approve-log";

function Index(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter()

  const callback = (carid) => {
    router.push({pathname: `/admin/approval/${carid}`});
  }


  return (
      <CarTable
        callback={callback}
        tableData={props.tableData}
        pendingTab={props.pendingTabData}
        approvedTab={props.approvedTabData}
        rejectedTab={props.rejectedTabData}
      />
  );
}

export async function getServerSideProps(context) {
  var tableResponse;
  var pendingTabResponse;
  var approvedTabResponse ;
  var rejectTabResponse;
  try {
    tableResponse = await getPending()
    pendingTabResponse = await getPendingApprove();
    approvedTabResponse = await getApproveApproval();
    rejectTabResponse = await getRejectedApproval();
    console.log("date", pendingTabResponse[0].create_at)
  } catch (e) {
    console.error(e)
    return {
      props: {
        tableData: [],
        pendingTabData: [],
        approvedTabData: [],
        rejectedTabData: []
      }
    }
  }

  const tableData = (tableResponse !== undefined)? (tableResponse.map((value, index) => {
      return {
        Merchant_Name: value.merchant,
        Car_Maker: value.carMaker,
        Car_Model: value.carModel,
        Preview_Image: (value.carImage === undefined || value.carImage === []) ? `/assets/img/car_placeholder.png`: value.carImage,
        modelData: value.modelData,
        manufacturerData: value.manufacturerData,
        carId: value.carId
      }
    })) : [];

    const pendingTabData = (pendingTabResponse !== undefined) ? pendingTabResponse.map((value, index) => {
      console.log("table Date:", value.create_at)
      return {
        record_ID: value.id,
        Merchant_Name: value.merchant,
        Car_Maker: value.carMaker,
        Car_Model: value.carModel,
        Preview_Image: (value.carImage === undefined || value.carImage === []) ? `/assets/img/car_placeholder.png`: value.carImage,
        modelData: value.modelData,
        manufacturerData: value.manufacturerData,
        carId: value.carId,
        create_at: value.create_at || null
      }
    }) : [];

  const approvedTabData = (approvedTabResponse !== undefined) ? approvedTabResponse.map((value, index) => {
    return {
      record_ID: value.id,
      Merchant_Name: value.merchant,
      Car_Maker: value.carMaker,
      Car_Model: value.carModel,
      Preview_Image: (value.carImage === undefined || value.carImage === []) ? `/assets/img/car_placeholder.png`: value.carImage,
      modelData: value.modelData,
      manufacturerData: value.manufacturerData,
      carId: value.carId,
      create_at: value.create_at || null
    }
  }) : [];

  const rejectedTabData = (rejectTabResponse !== undefined) ? rejectTabResponse.map((value, index) => {
    return {
      record_ID: value.id,
      Merchant_Name: value.merchant,
      Car_Maker: value.carMaker,
      Car_Model: value.carModel,
      Preview_Image: (value.carImage === undefined || value.carImage === []) ? `/assets/img/car_placeholder.png`: value.carImage,
      modelData: value.modelData,
      manufacturerData: value.manufacturerData,
      carId: value.carId,
      create_at: value.create_at || null
    }
  }) : [];

    return {
      props: {
        tableData: tableData,
        pendingTabData: pendingTabData,
        approvedTabData: approvedTabData,
        rejectedTabData: rejectedTabData
      }
    }
}

async function getRejectedApproval() {
  const data = await prisma.CarsApp_carapprovallog.findMany({
    where: {
      status: "R",
    },
    include: {
      CarsApp_car: {
        include: {
          CarsApp_carmanufacturer: {
            select: {
              maker_name: true,
              maker_country: true,
              maker_logo_url: true,
              serial: true
            }
          },
          CarsApp_carmodel: {
            select: {
              model_name: true,
              release_year: true,
            }
          },
          CarsApp_carimage: {
            select: {
              image_url: true
            }
          },
          UsersApp_customuser: {
            select: {
              first_name: true,
              last_name: true
            }
          }
        }
      }
    },

  }).catch(err => {throw new Error(err)});


  const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

  const endResultData = parsedData != undefined?(parsedData.map(async (value) => {
    const first_name = value.CarsApp_car.UsersApp_customuser.first_name;
    const last_name = value.CarsApp_car.UsersApp_customuser.last_name;
    const carID = value.CarsApp_car.id;
    const img = await prisma.CarsApp_carimage.findMany({
      where: {
        car_id: Number(carID)
      },
      select: {
        image_url: true
      }
    }).then(imgResponse => {
      const img = imgResponse.map((v) => {
        return v.image_url;
      });
      return img
    }).catch(err => {
      throw new Error(err)
    })


    return {
      id: value.id,
      carModel: value.CarsApp_car.CarsApp_carmodel.model_name,
      carImage: img,
      carMaker: value.CarsApp_car.CarsApp_carmanufacturer.maker_name,
      merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
      modelData: value.CarsApp_car.CarsApp_carmodel,
      manufacturerData: value.CarsApp_car.CarsApp_carmanufacturer,
      carId: value.car_id_id,
      created_at: value.created_at
    }
  })) : []

  const d = Promise.all(endResultData.map(item => item))

  return d
}

async function getApproveApproval() {
  const data = await prisma.CarsApp_carapprovallog.findMany({
    where: {
      status: "A"
    },
    include: {
      CarsApp_car: {
        include: {
          CarsApp_carmanufacturer: {
            select: {
              maker_name: true,
              maker_country: true,
              maker_logo_url: true,
              serial: true
            }
          },
          CarsApp_carmodel: {
            select: {
              model_name: true,
              release_year: true,
            }
          },
          CarsApp_carimage: {
            select: {
              image_url: true
            }
          },
          UsersApp_customuser: {
            select: {
              first_name: true,
              last_name: true
            }
          }
        }
      }
    },

  }).catch(err => {throw new Error(err)});


  const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

  const endResultData = parsedData != undefined?(parsedData.map(async (value) => {
    const first_name = value.CarsApp_car.UsersApp_customuser.first_name;
    const last_name = value.CarsApp_car.UsersApp_customuser.last_name;
    const carID = value.CarsApp_car.id;
    const img = await prisma.CarsApp_carimage.findMany({
      where: {
        car_id: Number(carID)
      },
      select: {
        image_url: true
      }
    }).then(imgResponse => {
      const img = imgResponse.map((v) => {
        return v.image_url;
      });
      return img
    }).catch(err => {
      throw new Error(err)
    })


    return {
      id: value.id,
      carModel: value.CarsApp_car.CarsApp_carmodel.model_name,
      carImage: img,
      carMaker: value.CarsApp_car.CarsApp_carmanufacturer.maker_name,
      merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
      modelData: value.CarsApp_car.CarsApp_carmodel,
      manufacturerData: value.CarsApp_car.CarsApp_carmanufacturer,
      carId: value.car_id_id,
      created_at: value.created_at
    }
  })) : []

  const d = Promise.all(endResultData.map(item => item))

  return d
}


async function getPendingApprove() {
  const data = await prisma.CarsApp_carapprovallog.findMany({
    where: {
      status: "P"
    },
    include: {
      CarsApp_car: {
        include: {
          CarsApp_carmanufacturer: {
            select: {
              maker_name: true,
              maker_country: true,
              maker_logo_url: true,
              serial: true
            }
          },
          CarsApp_carmodel: {
            select: {
              model_name: true,
              release_year: true,
            }
          },
          CarsApp_carimage: {
            select: {
              image_url: true
            }
          },
          UsersApp_customuser: {
            select: {
              first_name: true,
              last_name: true
            }
          }
        }
      }
    },

  }).catch(err => {throw new Error(err)});


  const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

  const endResultData = parsedData != undefined?(parsedData.map(async (value) => {
    const first_name = value.CarsApp_car.UsersApp_customuser.first_name;
    const last_name = value.CarsApp_car.UsersApp_customuser.last_name;
    const carID = value.CarsApp_car.id;
    const img = await prisma.CarsApp_carimage.findMany({
      where: {
        car_id: Number(carID)
      },
      select: {
        image_url: true
      }
    }).then(imgResponse => {
      const img = imgResponse.map((v) => {
        return v.image_url;
      });
      return img
    }).catch(err => {
      throw new Error(err)
    })
    // console.log(value.created_at)


    return {
      id: value.id,
      carModel: value.CarsApp_car.CarsApp_carmodel.model_name,
      carImage: img,
      carMaker: value.CarsApp_car.CarsApp_carmanufacturer.maker_name,
      merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
      modelData: value.CarsApp_car.CarsApp_carmodel,
      manufacturerData: value.CarsApp_car.CarsApp_carmanufacturer,
      carId: value.car_id_id,
      create_at: value.created_at
    }
  })) : []

  const d = Promise.all(endResultData.map(item => item))

  return d
}

Index.layout = Admin;

export default Index;
