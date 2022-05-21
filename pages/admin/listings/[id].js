import Admin from "../../../layouts/Admin";
import {useRouter} from "next/router";
import makeStyles from "@mui/styles/makeStyles";
import styles from "../../../assets/jss/nextjs-material-dashboard/views/dashboardStyle";
import React from "react";
import {useSession} from "next-auth/react";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import {Button, CardContent, Container, TextField} from "@mui/material";
import GridContainer from "../../../components/Grid/GridContainer";
import CardBody from "../../../components/Card/CardBody";
import CusButton from "../../../components/CustomButtons/Button";
import prisma from "../../../PrismaConnect";

function listingDetail(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const inputElement = React.useRef();
    const selectedCar = props.car;
    const router = useRouter();
    const {data: session, status} = useSession();
    const {token} = session;
    const {id} = token;

    const showFeatureCard = () => {
        if (props.carFeature === null || props.carFeature === undefined) {
            return []
        }
        return props.carFeature.map((v) => {
            return (
                <>
                    <GridItem>
                        <Card>
                            <CardHeader>{v.CarsApp_carfeatures.feature_name}</CardHeader>
                        </Card>
                    </GridItem>
                </>
            );
        });
    };

    return (
        <Container className="px-0">
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <h1 className="text-center text-2xl font-bold">
                            {selectedCar != null ? selectedCar.carOverview.carName : ""}
                        </h1>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <ul style={{overflowX: "auto", whiteSpace: "nowrap", padding: 0, margin: 0}}>
                            {selectedCar != null
                                ? selectedCar.carImage.map((value) => {
                                    return (
                                        <li style={{display: "inline-block", marginInlineEnd: 18}}>
                                            <img src={value} width={350} height={350}/>
                                        </li>
                                    );
                                })
                                : ""}
                        </ul>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card profile>
                            <CardHeader color="info">
                                <h2 className="font-medium">Description</h2>
                            </CardHeader>
                            <CardContent>
                                <CardBody>
                                    <p>{selectedCar != null ? selectedCar.carOverview.description : "-"}</p>
                                </CardBody>
                            </CardContent>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="info">
                                <h2 className="font-medium text-center">Car's Model</h2>
                            </CardHeader>

                            <CardContent>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={3} sm={3} md={3} style={{textAlign: "start"}}>
                                            condition: {selectedCar.carOverview.condition || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Maker: {selectedCar.carMaker || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Model: {selectedCar.modelData.model_name || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3} style={{textAlign: "start"}}>
                                            Car Grade/Package: {selectedCar.carOverview.grade || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Model year: {selectedCar.modelData.release_year || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Chassis Number: {selectedCar.carOverview.chassis_no || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Engine Number: {selectedCar.carOverview.engine_no || "-"}
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </CardContent>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
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
                                            Transmission : {selectedCar.carOverview.transmission_type || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Fuel Type : {selectedCar.carOverview.fuelType || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Exterior Colour : {selectedCar.carOverview.exterior_color || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Interior Colour : {selectedCar.carOverview.interior_color || "-"}
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
                                <h2 className="font-medium">Car's Features</h2>
                            </CardHeader>
                            <CardBody>
                                {showFeatureCard().length > 0 && <GridContainer>{showFeatureCard()}</GridContainer>}
                                {showFeatureCard().length === 0 && <div><div className={"text-center text-3xl"}>No data</div></div>}
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
                                    <Button
                                        onClick={() => {
                                            router.push(`/admin/approval/${parseInt(router.query.id)}/history`);
                                        }}
                                    >
                                        Detail
                                    </Button>
                                </Container>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </Container>
    );
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const car = await getDetail(parseInt(id));
    const carFeature = await getCarFeature(parseInt(id));
    const carHistory = await getHistory(parseInt(id));

    return {
        props: {
            car: car !== undefined ? car : null,
            carFeature: carFeature || null,
            carHistory: carHistory || null,
        }, // will be passed to the page component as props
    };
}

async function getHistory(id) {
    const data = await prisma.CarsApp_carapprovallog.findMany({
        where: {
            car_id_id: id,
        },
    }).catch((err) => {
        throw new Error(err);
    });


    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );
    return parsedData;
}

async function getCarFeature(car_id) {
    const data = await prisma.CarsApp_car_car_features.findMany({
        where: {
            car_id: car_id,
        },
        include: {CarsApp_carfeatures: true},
    }).catch((err) => {
        throw new Error(err);
    });
    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    return parsedData;
}

async function getDetail(car_id) {
    const data = await prisma.CarsApp_car.findFirst({
        where: {
            id: car_id,
        },
        include: {
            CarsApp_carmanufacturer: {
                select: {
                    maker_name: true,
                    maker_country: true,
                    maker_logo_url: true,
                    serial: true,
                },
            },
            CarsApp_carmodel: {
                select: {
                    model_name: true,
                    release_year: true,
                },
            },
            CarsApp_carimage: {
                select: {
                    image_url: true,
                },
            },
            UsersApp_customuser: {
                select: {
                    first_name: true,
                    last_name: true,
                },
            },
            CarsApp_carbodytype: true,
            CarsApp_cartype: true,
            CarsApp_carcolor_CarsApp_car_exterior_color_idToCarsApp_carcolor: true,
            CarsApp_carwheel: true,
            CarsApp_carcolor_CarsApp_car_interior_color_idToCarsApp_carcolor: true,
            CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel: true,
        },
    }).catch((err) => {
        throw new Error(err);
    });

    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    const first_name = parsedData.UsersApp_customuser.first_name;
    const last_name = parsedData.UsersApp_customuser.last_name;
    const carID = parsedData.id;
    const img = await prisma.CarsApp_carimage.findMany({
        where: {
            car_id: Number(carID),
        },
        select: {
            image_url: true,
        },
    })
        .then((imgResponse) => {
            const img = imgResponse.map((v) => {
                return v.image_url;
            });
            return img;
        })
        .catch((err) => {
            throw new Error(err);
        });

    const jsonData = {
        id: parsedData.id,
        carModel: parsedData.CarsApp_carmodel.model_name,
        carImage: img,
        carMaker: parsedData.CarsApp_carmanufacturer.maker_name,
        merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
        modelData: parsedData.CarsApp_carmodel,
        manufacturerData: parsedData.CarsApp_carmanufacturer,
        carOverview: {
            carName: parsedData.car_name,
            seatingCapacity: parsedData.seating_capacity,
            engineCapacity: parsedData.engine_capacity,
            drive: parsedData.drive,
            mileage: parsedData.mileage,
            transmission_type: parsedData.transmission_type,
            description: parsedData.description,
            fuelType: parsedData.CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel.fuel_type,
            condition: parsedData.CarsApp_cartype.car_type,
            sell_option: parsedData.sell_option,
            body: parsedData.CarsApp_carbodytype.body_name,
            status: parsedData.car_status,
            interior_color: parsedData.CarsApp_carcolor_CarsApp_car_interior_color_idToCarsApp_carcolor.car_color,
            exterior_color: parsedData.CarsApp_carcolor_CarsApp_car_exterior_color_idToCarsApp_carcolor.car_color,
            chassis_no: parsedData.chassis_no,
            engine_no: parsedData.engine_no,
            grade: parsedData.grade,
        },
    };

    return jsonData;
}

listingDetail.layout = Admin;
listingDetail.auth = true
export default listingDetail;