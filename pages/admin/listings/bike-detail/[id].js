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

function DetailBikeLog(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const inputElement = React.useRef();
    const selectedBike = props.bike;
    const router = useRouter();

    const showFeatureCard = () => {
        if (props.bikeFeature === null || props.bikeFeature === undefined) {
            return <p>None</p>;
        }
        return props.bikeFeature.map((v) => {
            return (
                <>
                    <GridItem>
                        <Card>
                            <CardHeader>{v.BikesApp_bikefeatures.feature_name}</CardHeader>
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
                            {selectedBike?.bikeOverview?.bikeName ?? "UNKNOWN BIKE NAME"}
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
                                {(selectedBike?.bikeImage ?? []).map((m, i) => {
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
                                    <p>{selectedBike != null ? selectedBike.bikeOverview.description : "-"}</p>
                                </CardBody>
                            </CardContent>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="info">
                                <h2 className="font-medium text-center">Bike's Model</h2>
                            </CardHeader>

                            <CardContent>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={3} sm={3} md={3} style={{ textAlign: "start" }}>
                                            condition: {selectedBike?.bikeOverview?.condition ?? "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Maker: {selectedBike.bikeMaker || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Model: {selectedBike.modelData.model_name || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3} style={{ textAlign: "start" }}>
                                            Car Grade/Package: {selectedBike.bikeOverview.grade || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Model year: {selectedBike.modelData.release_year || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Chassis Number: {selectedBike.bikeOverview.chassis_no || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Engine Number: {selectedBike.bikeOverview.engine_no || "-"}
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </CardContent>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="info">
                                <h2 className="font-medium text-center">Bike's Detail</h2>
                            </CardHeader>

                            <CardContent>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={3} sm={3} md={3} style={{ textAlign: "start" }}>
                                            Body : {selectedBike.bikeOverview.body || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Engine (cc) : {selectedBike.bikeOverview.engineCapacity || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3} style={{ textAlign: "start" }}>
                                            Mileage (km) : {selectedBike.bikeOverview.mileage || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Fuel Type : {selectedBike.bikeOverview.fuelType || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Color : {selectedBike.bikeOverview.color || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            City : {selectedBike.bikeOverview.body || "-"}
                                        </GridItem>

                                        <GridItem xs={3} sm={3} md={3}>
                                            Status : {selectedBike.bikeOverview.status || "-"}
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                            </CardContent>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                        <Card profile>
                            <CardHeader color="info">
                                <h2 className="font-medium">Bike's Features</h2>
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
                                            router.push(`/admin/approval/${parseInt(router.query.id)}/history?type=bike`);
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
    const bike = await getDetail(parseInt(id));
    const bikeFeature = await getBikeFeature(parseInt(id));

    return {
        props: {
            bike: bike ?? null,
            bikeFeature: bikeFeature ?? null,
        }, // will be passed to the page component as props
    };
}

async function getBikeFeature(bike_id) {
    const data = await prisma.BikesApp_bike_bike_features.findMany({
        where: {
            bike_id: bike_id,
        },
        include: { BikesApp_bikefeatures: true },
    }).catch((err) => {
        throw new Error(err);
    });
    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    return parsedData;
}

async function getDetail(bike_id) {
    const data = await prisma.BikesApp_bikeapprovallog.findFirst({
        where: {
            bike_id_id: bike_id,
        },
        include: {
            BikesApp_bike: {
                include: {
                    BikesApp_bikemanufacturer: {
                        select: {
                            maker_name: true,
                            maker_country: true,
                            maker_logo_url: true,
                            serial: true,
                        },
                    },
                    BikesApp_bikemodel: {
                        select: {
                            model_name: true,
                            release_year: true,
                        },
                    },
                    BikesApp_bikeimage: {
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
                    BikesApp_bikebodytype: true,
                    BikesApp_biketype: true,
                    BikesApp_bikecolor: true,
                    BikesApp_tyretype: true,
                    BikesApp_cooling: true,
                    BikesApp_ignition: true,
                },
            },
        },
    }).catch((err) => {
        throw new Error(err);
    });

    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    const first_name = parsedData?.BikesApp_bike?.UsersApp_customuser?.first_name;
    const last_name = parsedData?.BikesApp_bike?.UsersApp_customuser?.last_name;
    const bikeID = parsedData?.BikesApp_bike?.id;
    let img = [];
    if (bikeID) {
        img = await prisma.BikesApp_bikeimage.findMany({
            where: {
                bike_id: Number(bikeID),
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
        bikeModel: parsedData?.BikesApp_bike?.BikesApp_bikemodel?.model_name ?? "-",
        bikeImage: img,
        bikeMaker: parsedData?.BikesApp_bike?.BikesApp_bikemanufacturer?.maker_name ?? "-",
        merchant: `${first_name ?? "UNKNOWN"} ${last_name ?? "NAME"}`,
        modelData: parsedData?.BikesApp_bike?.BikesApp_bikemodel ?? "-",
        manufacturerData: parsedData?.BikesApp_bike?.BikesApp_bikemanufacturer ?? "-",
        bikeOverview: {
            bikeName: parsedData?.BikesApp_bike?.bike_name ?? "-",
            engineCapacity: parsedData?.BikesApp_bike?.engine_capacity ?? "-",
            mileage: parsedData?.BikesApp_bike?.mileage ?? "-",
            description: parsedData?.BikesApp_bike?.description ?? "-",
            fuelType: parsedData?.BikesApp_bike?.BikesApp_bikefuel?.fuel_type ?? "-",
            condition: parsedData?.BikesApp_bike?.BikesApp_biketype?.bike_type ?? "-",
            sell_option: parsedData?.BikesApp_bike?.sell_option ?? "-",
            body: parsedData?.BikesApp_bike?.BikesApp_bikebodytype?.body_name ?? "-",
            status: parsedData?.BikesApp_bike?.bike_status ?? "-",
            color: parsedData?.BikesApp_bike?.BikesApp_bikecolor?.bike_color ?? "-",
            chassis_no: parsedData?.BikesApp_bike?.chassis_no ?? "-",
            engine_no: parsedData?.BikesApp_bike?.engine_no ?? "-",
            grade: parsedData?.BikesApp_bike?.grade ?? "-",
        },
    };

    return jsonData;
}



DetailBikeLog.layout = Admin;
DetailBikeLog.auth = true;

export default DetailBikeLog;
