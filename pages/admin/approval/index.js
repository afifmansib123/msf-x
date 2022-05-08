import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import {useRouter} from 'next/router'
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import CarTable from '../../../components/Table/ApproveTable';
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { PrismaClient } from "@prisma/client";
import {get} from "react-hook-form";

const prisma = new PrismaClient() ;

function Index(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter()

  // const tabHandler = (index) => {
  //   if(index === 0) {
  //     router.push({pathname: '/admin/approval/', query: {tab: 0}})
  //   }
  //   else if (index === 1) {
  //     router.push({pathname: '/admin/approval/', query: {tab: 1}})
  //   } else {
  //     router.push({pathname: '/admin/approval/', query: {tab: 2}})
  //   }
  // }

  const callback = (carid, recordid) => {
      // router.push(`/admin/approval/${carid}`);
    router.push({pathname: `/admin/approval/${carid}`, query: {record_id: recordid}});
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
    tableResponse = await getAllApprove();
    pendingTabResponse = tableResponse;
    approvedTabResponse = await getCompleteApprove();
    rejectTabResponse = await getRejectedApprove();
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
        record_ID: value.id,
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
      return {
        record_ID: value.id,
        Merchant_Name: value.merchant,
        Car_Maker: value.carMaker,
        Car_Model: value.carModel,
        Preview_Image: (value.carImage === undefined || value.carImage === []) ? `/assets/img/car_placeholder.png`: value.carImage,
        modelData: value.modelData,
        manufacturerData: value.manufacturerData,
        carId: value.carId
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
      carId: value.carId
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
      carId: value.carId
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

async function getRejectedApprove() {
  const data = await prisma.CarsApp_carapprovallogs.findMany({
    where: {
      NOT: {
        approved_by_id:  null,
        review: null,
      },
      is_approved: false
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
      carId: value.car_id_id
    }
  })) : []

  const d = Promise.all(endResultData.map(item => item))

  return d
}

async function getCompleteApprove() {
  const data = await prisma.CarsApp_carapprovallogs.findMany({
    where: {
      NOT: {
        approved_by_id:  null,
        review: null,
      },
      is_approved: true
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
      carId: value.car_id_id
    }
  })) : []

  const d = Promise.all(endResultData.map(item => item))

  return d
}


async function getAllApprove() {
  const data = await prisma.CarsApp_carapprovallogs.findMany({
    where: {
      approved_by_id: {equals: null},
      review: null
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
      carId: value.car_id_id
    }
  })) : []

  const d = Promise.all(endResultData.map(item => item))

  return d
}

Index.layout = Admin;

export default Index;
