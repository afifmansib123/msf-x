import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import makeStyles from '@mui/styles/makeStyles';
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "axios";
import Typography from "@mui/material/Typography";
import prisma from "PrismaConnect";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import {Button} from "@mui/material";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function TableList(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [cars, setCars] = React.useState([]);
  const router = useRouter();

  const handleChange = (e, value) => {
    setPage(value);
  };
  const totalCount = props.totalCar || 0;
  const totalPage = Math.ceil(totalCount/20) - 1;

  const onDetailClick = async (car_id)  => {
    console.log(car_id)
    await router.push({ pathname: `/admin/listings/${car_id}`});
  };

  React.useEffect(()  => {
    const carlist = axios.get(`/api/cars?page=${page}`).then((v) => {
      let {cars} = v.data;
      cars = cars || [];
      let result = cars.map((item, index)=> {
        return (
            <div key={index}>
              <div className={"flex my-10"}>
                <div className={"flex-row"}> <img src={item.img[0]} width={250}/> </div>
                <div className={"flex-row ml-10"}>
                  <div>
                    <div className={"grid grid-cols"}>
                      <span className={"font-semibold col"}>Car Name</span>
                      <span className={""}>{item.car.car_name}</span>
                    </div>
                    <div className={"grid grid-cols"}>
                      <span className={"font-semibold col"}>Seat Capacity</span>
                      <span className={""}>{item.car.seating_capacity}</span>
                    </div>
                    <div className={"grid grid-cols"}>
                      <span className={"font-semibold col"}>Engine Capacity</span>
                      <span className={""}>{item.car.engine_capacity}</span>
                    </div>
                    <Button onClick={() => onDetailClick(item.car.id)}>Detail</Button>
                  </div>

                </div>
              </div>
              {cars.length - 1 !== index && <Divider/>}
            </div>
          )
      })
      setCars(result);
    });
  }, [page]);


  return (
      <>
        <h2 className="text-4xl font-bold text-center">Merchant Car</h2>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                {cars}
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <div className={"text-center"}>
              <Stack spacing={2} className={"items-center"}>
                <Typography>Page: {page}</Typography>
                <Pagination count={totalPage} page={page} onChange={handleChange} howFirstButton showLastButton size="large"/>
              </Stack>
            </div>
          </GridItem>
        </GridContainer>
      </>
  );
}

export async function getServerSideProps(context) {
  let carCount = await prisma.CarsApp_car.count();
  return {
    props: {
      totalCar: carCount
    }
  }
}

TableList.layout = Admin;
TableList.auth = true

export default TableList;
