import {useRouter} from 'next/router'
import {
    Button, Container,
    Divider,
    TextField
} from "@mui/material";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CusButton from "../../../components/CustomButtons/Button";
import React  from "react";
import makeStyles from "@mui/styles/makeStyles";
import styles from "../../../assets/jss/nextjs-material-dashboard/views/dashboardStyle";
import { PrismaClient } from "@prisma/client";
import { useState, useRef } from "react";

const prisma = new PrismaClient() ;

function DetailCarLog(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const inputElement = React.useRef();
    const selectedCar = props.car;
    const router = useRouter();

    // const [pageLoading, setPageLoading] = React.useState(false)
    const handleSubmit = async (type) => {
        const reason = inputElement.current.value;
        if (reason.trim() !== "") {
            console.log("reason is filled")
        } else {
            alert("Please specify your reason.")
            inputElement.current.focus();
            return
        }

        if(type == "approve") {
            await handleApprove(reason, 19, parseInt(router.query.record_id))
            router.push(`/admin/approval/`);
        } else {
            await handleReject(reason, 19, parseInt(router.query.record_id))
            router.push(`/admin/approval/`);
        }
    }

    return (
        <Container>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    {
                        (selectedCar != null) ? (selectedCar.carOverview.carName) : ""
                    }
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <ul style={{overflowX: "auto", whiteSpace: "nowrap", padding: 0, margin: 0}}>
                        {
                            selectedCar != null ? (selectedCar.carImage.map((value) => {
                                return (
                                    <li style={{display: "inline-block", marginInlineEnd: 18}}>
                                        <img src={value} width={350} height={350}/>
                                    </li>
                                )
                            })) : ""
                        }
                    </ul>
                    <br/>
                    <GridItem xs={12} sm={12} md={12}>
                        Description
                        <Divider/>
                        <p>
                            {
                                (selectedCar != null) ? (selectedCar.carOverview.description) : "-"
                            }
                        </p>
                    </GridItem>

                    <br/>
                    <GridItem xs={12} sm={12} md={12}>
                        Car's Model
                        <Divider/>
                        <div>
                            condition: {(selectedCar != null) ? (selectedCar.carOverview.condition) : "-"}
                        </div>
                    </GridItem>

                    <br/>
                    <GridItem xs={12} sm={12} md={12}>
                        Car's Detail
                        <Divider/>
                        <GridContainer>
                            <GridItem xs={3} sm={3} md={3} style={{textAlign: "start"}}>
                                Body : {(selectedCar != null) ? (selectedCar.carOverview.body) : "-"}
                            </GridItem>

                            <GridItem xs={3} sm={3} md={3}>
                                Engine (cc) : {(selectedCar != null) ? (selectedCar.carOverview.engineCapacity) : "-"}
                            </GridItem>

                            <GridItem xs={3} sm={3} md={3}>
                                Drive : {(selectedCar != null) ? (selectedCar.carOverview.drive) : "-"}
                            </GridItem>

                            <GridItem xs={3} sm={3} md={3} style={{textAlign: "start"}}>
                                Mileage (km) : {(selectedCar != null) ? (selectedCar.carOverview.mileage) : "-"}
                            </GridItem>

                            <GridItem xs={3} sm={3} md={3}>
                                No. of Seats : {(selectedCar != null) ? (selectedCar.carOverview.seatingCapacity) : "-"}
                            </GridItem>

                            <GridItem xs={3} sm={3} md={3}>
                                Transmission
                                : {(selectedCar != null) ? (selectedCar.carOverview.transmission_type) : "-"}
                            </GridItem>


                            <GridItem xs={3} sm={3} md={3}>
                                Fuel Type : {(selectedCar != null) ? (selectedCar.carOverview.fuelType) : "-"}
                            </GridItem>

                            <GridItem xs={3} sm={3} md={3}>
                                Exterior Colour
                                : {(selectedCar != null) ? (selectedCar.carOverview.exterior_color) : "-"}
                            </GridItem>

                            <GridItem xs={3} sm={3} md={3}>
                                Interior Colour
                                : {(selectedCar != null) ? (selectedCar.carOverview.interior_color) : "-"}
                            </GridItem>

                            <GridItem xs={3} sm={3} md={3}>
                                City : {(selectedCar != null) ? (selectedCar.carOverview.body) : "-"}
                            </GridItem>

                            <GridItem xs={3} sm={3} md={3}>
                                Status : {(selectedCar != null) ? (selectedCar.carOverview.status) : "-"}
                            </GridItem>

                        </GridContainer>
                    </GridItem>

                    <br/>
                    <GridItem xs={12} sm={12} md={12}>
                        Car's Features
                        <Divider/>

                        <GridContainer>
                            <GridItem>
                                <Card>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem>
                                                Body
                                            </GridItem>
                                            <GridItem>
                                                Smt
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>

                            <GridItem>
                                <Card>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem>
                                                Body
                                            </GridItem>
                                            <GridItem>
                                                Smt
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>

                            <GridItem>
                                <Card>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem>
                                                Body
                                            </GridItem>
                                            <GridItem>
                                                Smt
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>

                        </GridContainer>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        Approve History
                        <Divider/>
                        <Container>

                        </Container>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        Explain your reason <span style={{color: "red"}}>**</span>
                    </GridItem>
                    <TextField
                        inputRef={inputElement}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Reason"
                        type="text"
                        multiline
                        fullWidth
                        variant="outlined"
                        defaultValue={" "}
                        rows={10}
                        inputProps={{
                            style: {
                                scrollBehavior: "auto"
                            },
                        }}
                    />

                </GridItem>

                <GridItem xs={12} sm={12} md={12}>

                    <CusButton color="success" round={true} onClick={() => handleSubmit("approve")}>Approve</CusButton>
                    <CusButton color="danger" round={true} onClick={() => handleSubmit("reject")}>Reject</CusButton>

                </GridItem>

            </GridContainer>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const car = await getDetail(parseInt(id));

    return {
        props: {
            car: (car !== undefined)? car : null
        }, // will be passed to the page component as props
    }
}

async function handleApprove(review_string, approval_id, record_id) {
    await fetch('http://localhost:3000/api/approve-log/approve',
        {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                review_string: review_string,
                approval_id: approval_id,
                record_id: record_id
            }),
        })
}

async function handleReject(review_string, approval_id, record_id) {
    await fetch('http://localhost:3000/api/approve-log/reject',
        {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                review_string: review_string,
                approval_id: approval_id,
                record_id: record_id
            }),
        })
}

async function getHistory(id) {
    // const data = await prisma.CarsApp_carapprovallogs.findfirst({
    //     where: {
    //         id: id
    //     }
    // })
}

async function getDetail(car_id) {
    const data = await prisma.CarsApp_carapprovallogs.findFirst({
        where: {
            car_id_id: car_id
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
                    },
                    CarsApp_carbodytype: true,
                    CarsApp_cartype: true,
                    CarsApp_carcolor_CarsApp_car_exterior_color_idToCarsApp_carcolor: true,
                    CarsApp_carwheel: true,
                    CarsApp_carcolor_CarsApp_car_interior_color_idToCarsApp_carcolor: true,
                    CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel: true
                }
            }
        },

    }).catch(err => {throw new Error(err)});

    const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

    const first_name = parsedData.CarsApp_car.UsersApp_customuser.first_name;
    const last_name = parsedData.CarsApp_car.UsersApp_customuser.last_name;
    const carID = parsedData.CarsApp_car.id;
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

    const jsonData = {
        id: parsedData.id,
        carModel: parsedData.CarsApp_car.CarsApp_carmodel.model_name,
        carImage: img,
        carMaker: parsedData.CarsApp_car.CarsApp_carmanufacturer.maker_name,
        merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
        modelData: parsedData.CarsApp_car.CarsApp_carmodel,
        manufacturerData: parsedData.CarsApp_car.CarsApp_carmanufacturer,
        carOverview: {
            carName: parsedData.CarsApp_car.car_name,
            seatingCapacity: parsedData.CarsApp_car.seating_capacity,
            engineCapacity: parsedData.CarsApp_car.engine_capacity,
            drive: parsedData.CarsApp_car.drive,
            mileage: parsedData.CarsApp_car.mileage,
            transmission_type: parsedData.CarsApp_car.transmission_type,
            description: parsedData.CarsApp_car.description,
            fuelType: parsedData.CarsApp_car.CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel.fuel_type,
            condition: parsedData.CarsApp_car.CarsApp_cartype.car_type,
            sell_option: parsedData.CarsApp_car.sell_option,
            body: parsedData.CarsApp_car.CarsApp_carbodytype.body_name,
            status: parsedData.CarsApp_car.car_status,
            interior_color: parsedData.CarsApp_car.CarsApp_carcolor_CarsApp_car_interior_color_idToCarsApp_carcolor.car_color,
            exterior_color: parsedData.CarsApp_car.CarsApp_carcolor_CarsApp_car_exterior_color_idToCarsApp_carcolor.car_color
        }
    }

    return jsonData
}

export default DetailCarLog;