import {useRouter} from 'next/router'
import {
    Button, CardContent, Container,
    TextField
} from "@mui/material";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CusButton from "../../../components/CustomButtons/Button";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import styles from "../../../assets/jss/nextjs-material-dashboard/views/dashboardStyle";
import prisma from "../../../PrismaConnect";
import CardHeader from "../../../components/Card/CardHeader";


function DetailCarLog(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const inputElement = React.useRef();
    const selectedCar = props.car;
    const router = useRouter();

    const showFeatureCard = () => {
        if (props.carFeature === null || props.carFeature === undefined) {
            return (
                <p>None</p>
            );
        }
        return props.carFeature.map(v => {
            return (
                <>
                    <GridItem>
                        <Card>
                            <CardHeader>
                                {v.CarsApp_carfeatures.feature_name}
                            </CardHeader>

                        </Card>
                    </GridItem>
                </>
            )
        });
    }

    const handleSubmit = async (type) => {
        const reason = inputElement.current.value;
        if (reason.trim() === "") {
            alert("Please specify your reason.")
            inputElement.current.focus();
            return
        }

        if (type == "approve") {
            await handleApprove(reason, 1, parseInt(router.query.id))
            router.push(`/admin/approval/`);
        } else {
            await handleReject(reason, 1, parseInt(router.query.id))
            router.push(`/admin/approval/`);
        }
    }

    return (
        <Container className="px-0">
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h1 className="text-center text-2xl font-bold">
                            {
                                (selectedCar != null) ? (selectedCar.carOverview.carName) : ""
                            }
                        </h1>
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
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card profile>
                            <CardHeader color="info">
                                <h2 className="font-medium">
                                    Description
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <CardBody>
                                    <p>
                                        {
                                            (selectedCar != null) ? (selectedCar.carOverview.description) : "-"
                                        }
                                    </p>
                                </CardBody>
                            </CardContent>

                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card profile>
                            <CardHeader color="info">
                                <h2 className="font-medium text-center">
                                    Car's Model
                                </h2>
                            </CardHeader>

                            <CardContent>
                                <CardBody>
                                    <div>
                                        condition: {selectedCar.carOverview.condition || "-"}
                                    </div>
                                    <div >
                                        Maker: {selectedCar.carMaker || "-"}
                                    </div>
                                    <div>Model: {selectedCar.modelData.model_name || "-"}</div>
                                    <div>Car Grade/Package: {selectedCar.carOverview.grade || "-"}</div>
                                    <div>Model year: {selectedCar.modelData.release_year || "-"}</div>
                                    <div>Chassis Number: {selectedCar.carOverview.chassis_no || "-"}</div>
                                    <div>Engine Number: {selectedCar.carOverview.engine_no || "-"}</div>
                                </CardBody>
                            </CardContent>

                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card >
                            <CardHeader color="info">
                                <h2 className="font-medium text-center">Car's Detail</h2>
                            </CardHeader>

                            <CardContent>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={3} sm={3} md={3} style={{textAlign: "start"}}>
                                            Body : {selectedCar.carOverview.body || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Engine (cc) : {selectedCar.carOverview.engineCapacity || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Drive : {selectedCar.carOverview.drive || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3} style={{textAlign: "start"}}>
                                            Mileage (km) : {selectedCar.carOverview.mileage || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            No. of Seats : {selectedCar.carOverview.seatingCapacity || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Transmission
                                            : {selectedCar.carOverview.transmission_type || "-"}
                                        </GridItem>


                                        <GridItem xs={3} sm={3} md={3}>
                                            Fuel Type : {selectedCar.carOverview.fuelType || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Exterior Colour
                                            : {selectedCar.carOverview.exterior_color || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Interior Colour
                                            : {selectedCar.carOverview.interior_color || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            City : {selectedCar.carOverview.body || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Status : {selectedCar.carOverview.status || "-"}
                                        </GridItem>

                                    </GridContainer>
                                </CardBody>
                            </CardContent>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card profile>
                            <CardHeader color="info">
                                <h2 className="font-medium">
                                    Car's Features
                                </h2>

                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    {showFeatureCard()}
                                </GridContainer>
                            </CardBody>

                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card plain profile>
                            <CardHeader color="info">
                                <h2 className="font-medium">Approve History</h2>
                            </CardHeader>
                            <CardBody>
                                <Container>
                                    <Button onClick={() => {
                                        router.push(`/admin/approval/${parseInt(router.query.id)}/history`);
                                    }}>Detail</Button>
                                </Container>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card profile plain>
                            <CardHeader color="info">
                                <h2 className="font-medium">
                                    Explain your reason <span style={{color: "red"}}>**</span>
                                </h2>
                            </CardHeader>
                            <CardBody>
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
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>

                        <CusButton color="success" round={true}
                                   onClick={() => handleSubmit("approve")}>Approve</CusButton>
                        <CusButton color="danger" round={true} onClick={() => handleSubmit("reject")}>Reject</CusButton>

                    </GridItem>

                </GridContainer>
            </div>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const car = await getDetail(parseInt(id));
    const carFeature = await getCarFeature(parseInt(id));
    const carHistory = await getHistory(parseInt(id));

    return {
        props: {
            car: (car !== undefined) ? car : null,
            carFeature: carFeature || null,
            carHistory: carHistory || null
        }, // will be passed to the page component as props
    }
}

async function handleApprove(review_string, approval_id, car_id) {
    await fetch('http://localhost:3000/api/approve-log/approve',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                review_string: review_string,
                approval_id: approval_id,
                car_id: car_id
            }),
        })
}

async function handleReject(review_string, approval_id, car_id) {
    await fetch('http://localhost:3000/api/approve-log/reject',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                review_string: review_string,
                approval_id: approval_id,
                car_id: car_id
            }),
        })
}

async function getHistory(id) {
    const data = await prisma.CarsApp_carapprovallog.findMany({
        where: {
            car_id_id: id
        }
    }).catch(err => {
        throw new Error(err)
    });

    const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
    return parsedData;
}

async function getCarFeature(car_id) {
    const data = await prisma.CarsApp_car_car_features.findMany({
        where: {
            car_id: car_id
        },
        include: {CarsApp_carfeatures: true}
    }).catch(err => {
        throw new Error(err)
    });
    const parsedData = JSON.parse(JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value)));

    return parsedData;
}

async function getDetail(car_id) {
    const data = await prisma.CarsApp_carapprovallog.findFirst({
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

    }).catch(err => {
        throw new Error(err)
    });

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
            exterior_color: parsedData.CarsApp_car.CarsApp_carcolor_CarsApp_car_exterior_color_idToCarsApp_carcolor.car_color,
            chassis_no: parsedData.CarsApp_car.chassis_no,
            engine_no: parsedData.CarsApp_car.engine_no,
            grade: parsedData.CarsApp_car.grade
        }
    }

    return jsonData
}

export default DetailCarLog;