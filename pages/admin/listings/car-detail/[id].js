import { useRouter } from "next/router";
import { Button, CardContent, Container, TextField } from "@mui/material";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CusButton from "components/CustomButtons/Button";
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import prisma from "PrismaConnect";
import CardHeader from "components/Card/CardHeader";
import Admin from "layouts/Admin.js";
import { useSession } from "next-auth/react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const styles = {
    pics: {
        height: "20%",
    },
    arrows: {
        position: "absolute",
        zIndex: 2,
        top: "calc(50% - 15px)",
        width: 30,
        height: 30,
        cursor: "pointer",
    }
}

function DetailCarLog(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const inputElement = React.useRef();
    const selectedCar = props.car;
    const router = useRouter();

    const showFeatureCard = () => {
        if (props.carFeature === null || props.carFeature === undefined) {
            return <p>None</p>;
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
                            {selectedCar?.carOverview?.carName ?? "UNKNOWN CAR NAME"}
                        </h1>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <div
                            className={"carousel-wrapper rounded-xl bg-white"}>
                            <Carousel
                                infiniteLoop
                                useKeyboardArrows
                                autoPlay
                                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                    hasPrev && (
                                        <IconButton
                                            className={classes.arrows}
                                            aria-label="arrowBackIosNew"
                                            onClick={onClickHandler}
                                            style={{left: 15}}
                                        >
                                            <ArrowBackIosNewIcon/>
                                        </IconButton>
                                    )
                                }
                                renderArrowNext={(onClickHandler, hasNext, label) =>
                                    hasNext && (
                                        <IconButton
                                            className={classes.arrows}
                                            aria-label="arrowForwardIos"
                                            onClick={onClickHandler}
                                            style={{right: 15}}
                                        >
                                            <ArrowForwardIosIcon/>
                                        </IconButton>
                                    )
                                }
                            >
                                {(selectedCar?.carImage ?? []).map((m, i) => {
                                    return (
                                        <div style={{height: "55vh", width: "100%", margin: "auto"}}
                                             className={classes.pics}>
                                            <img src={m} className={"object-cover"}
                                                 style={{height: "100%", width: "100%"}}/>
                                        </div>
                                    );
                                })}
                            </Carousel>
                        </div>
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
                                        <GridItem xs={3} sm={3} md={3} style={{ textAlign: "start" }}>
                                            condition: {selectedCar.carOverview.condition || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Maker: {selectedCar.carMaker || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Model: {selectedCar.modelData.model_name || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3} style={{ textAlign: "start" }}>
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
                                        <GridItem xs={3} sm={3} md={3} style={{ textAlign: "start" }}>
                                            Body : {selectedCar.carOverview.body || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Engine (cc) : {selectedCar.carOverview.engineCapacity || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Drive : {selectedCar.carOverview.drive || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3} style={{ textAlign: "start" }}>
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
                                {showFeatureCard().length === 0 && (
                                    <div>
                                        <div className={"text-center text-3xl"}>No data</div>
                                    </div>
                                )}
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

    return {
        props: {
            car: car !== undefined ? car : null,
            carFeature: carFeature || null,
        }, // will be passed to the page component as props
    };
}

async function getCarFeature(car_id) {
    const data = await prisma.CarsApp_car_car_features.findMany({
        where: {
            car_id: car_id,
        },
        include: { CarsApp_carfeatures: true },
    }).catch((err) => {
        throw new Error(err);
    });
    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    return parsedData;
}

async function getDetail(car_id) {
    const data = await prisma.CarsApp_carapprovallog.findFirst({
        where: {
            car_id_id: car_id,
        },
        include: {
            CarsApp_car: {
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
            },
        },
    }).catch((err) => {
        throw new Error(err);
    });

    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    const first_name = parsedData?.CarsApp_car?.UsersApp_customuser?.first_name;
    const last_name = parsedData?.CarsApp_car?.UsersApp_customuser?.last_name;
    const carID = parsedData?.CarsApp_car?.id;
    let img = [];
    if (carID) {
        img = await prisma.CarsApp_carimage.findMany({
            where: {
                car_id: Number(carID),
            },
            select: {
                image_url: true,
            },
        }).then((imgResponse) => {
            const img = imgResponse.map((v) => {
                return v.image_url;
            });
            return img;
        }).catch((err) => {
            throw new Error(err);
        });
    }

    // console.debug("parsedData", parsedData);
    const jsonData = {
        id: parsedData?.id ?? "-",
        carModel: parsedData?.CarsApp_car?.CarsApp_carmodel?.model_name ?? "-",
        carImage: img,
        carMaker: parsedData?.CarsApp_car?.CarsApp_carmanufacturer?.maker_name ?? "-",
        merchant: `${first_name ?? "UNKNOWN"} ${last_name ?? "NAME"}`,
        modelData: parsedData?.CarsApp_car?.CarsApp_carmodel ?? "-",
        manufacturerData: parsedData?.CarsApp_car?.CarsApp_carmanufacturer ?? "-",
        carOverview: {
            carName: parsedData?.CarsApp_car?.car_name ?? "-",
            seatingCapacity: parsedData?.CarsApp_car?.seating_capacity ?? "-",
            engineCapacity: parsedData?.CarsApp_car?.engine_capacity ?? "-",
            drive: parsedData?.CarsApp_car?.drive ?? "-",
            mileage: parsedData?.CarsApp_car?.mileage ?? "-",
            transmission_type: parsedData?.CarsApp_car?.transmission_type ?? "-",
            description: parsedData?.CarsApp_car?.description ?? "-",
            fuelType: parsedData?.CarsApp_car?.CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel?.fuel_type ?? "-",
            condition: parsedData?.CarsApp_car?.CarsApp_cartype?.car_type ?? "-",
            sell_option: parsedData?.CarsApp_car?.sell_option ?? "-",
            body: parsedData?.CarsApp_car?.CarsApp_carbodytype?.body_name ?? "-",
            status: parsedData?.CarsApp_car?.car_status ?? "-",
            interior_color: parsedData?.CarsApp_car?.CarsApp_carcolor_CarsApp_car_interior_color_idToCarsApp_carcolor?.car_color ?? "-",
            exterior_color: parsedData?.CarsApp_car.CarsApp_carcolor_CarsApp_car_exterior_color_idToCarsApp_carcolor?.car_color ?? "-",
            chassis_no: parsedData?.CarsApp_car?.chassis_no ?? "-",
            engine_no: parsedData?.CarsApp_car?.engine_no ?? "-",
            grade: parsedData?.CarsApp_car?.grade ?? "-",
        },
    };

    return jsonData;
}



DetailCarLog.layout = Admin;
DetailCarLog.auth = true;

export default DetailCarLog;
