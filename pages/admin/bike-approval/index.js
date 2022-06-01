import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useRouter } from "next/router";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import BikeTable from "/components/Table/BikeApproveTable";
import styles from "/assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import prisma from "/PrismaConnect";
import { getPending } from "../../api/approve-log";

function BikeApprovalIndexPage(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const router = useRouter();
    const [page, setPage] = React.useState(1);
    const [typeVal, setTypeVal] = React.useState("car");
    const { type } = router.query;
    const totalCount = props.totalBikelog || 0;
    let totalPage = Math.ceil(totalCount/10);
    totalPage = totalPage < 1 ? 1: (totalPage);

    React.useEffect(() => {
        setPage(1)
    }, []);

    const callback = (bike_id) => {
        router.push({ pathname: `/admin/bike-approval/${bike_id}`});
    };

    const onHistoryClicked = (bike_id) => {
        router.push(`/admin/approval/${bike_id}/history?type="bike"`);
    };

    return (
        <BikeTable
            callback={callback}
            tableData={props.tableData}
            pendingTab={props.pendingTabData}
            approvedTab={props.approvedTabData}
            rejectedTab={props.rejectedTabData}
            historyBtnClicked={onHistoryClicked}
            totalPage={totalPage}
            page={page}
            type={typeVal}
            onTypeChange={(e) => {
                console.log(e.target.value)
            }}
            handleChange={(e, value) => {
                setPage(value);
                router.push(`/admin/bike-approval?page=${page}`);
            }}
        />
    );
}

export async function getServerSideProps(context) {
    let bikelogCount = await prisma.BikesApp_bikeapprovallog.count();
    var tableResponse;
    var pendingTabResponse;
    var approvedTabResponse;
    var rejectTabResponse;
    const {page} = context.query || 1

    try {
        tableResponse = await getPending(page, "bike");
        pendingTabResponse = await getPendingApprove();
        approvedTabResponse = await getApproveApproval();
        rejectTabResponse = await getRejectedApproval();
    } catch (e) {
        console.error(e)
        return {
            props: {
                tableData: [],
                pendingTabData: [],
                approvedTabData: [],
                rejectedTabData: [],
                totalBikelog: bikelogCount
            },
        };
    }

    const tableData =
        tableResponse !== undefined
            ? tableResponse.map((value, index) => {
                return {
                    Merchant_Name: value?.merchant || null,
                    Bike_Maker: value?.bikeMaker || null,
                    Bike_Model: value?.bikeModel || null,
                    Preview_Image:
                        value.bikeImage === undefined || value.bikeImage === [] || value.bikeImage === null
                            ? `/assets/img/car_placeholder.png`
                            : value.bikeImage,
                    modelData: value?.modelData || null,
                    manufacturerData: value?.manufacturerData || null,
                    bikeId: value?.bikeId || null,
                    bikeName: value?.bikeName || null,
                };
            })
            : [];

    const pendingTabData =
        pendingTabResponse !== undefined
            ? pendingTabResponse.map((value, index) => {
                return {
                    record_ID: value?.id || null,
                    Merchant_Name: value?.merchant || null,
                    Bike_Maker: value?.bikeMaker || null,
                    Bike_Model: value?.bikeModel || null,
                    Preview_Image:
                        value.bikeImage === undefined || value.bikeImage === [] || value.bikeImage === null
                            ? `/assets/img/car_placeholder.png`
                            : value.bikeImage,
                    modelData: value?.modelData || null,
                    manufacturerData: value?.manufacturerData || null,
                    bikeId: value?.bikeId || null,
                    create_at: value?.create_at || null,
                    bikeName: value?.bikeName || "",
                };
            })
            : [];

    const approvedTabData =
        approvedTabResponse !== undefined
            ? approvedTabResponse.map((value, index) => {
                return {
                    record_ID: value?.id || null,
                    Merchant_Name: value?.merchant || null,
                    Bike_Maker: value?.bikeMaker || null,
                    Bike_Model: value?.bikeModel || null,
                    Preview_Image:
                        value.bikeImage === undefined || value.bikeImage === [] || value.bikeImage === null
                            ? `/assets/img/car_placeholder.png`
                            : value.bikeImage,
                    modelData: value?.modelData || null,
                    manufacturerData: value?.manufacturerData || null,
                    bikeId: value?.bikeId || null,
                    create_at: value?.create_at || null,
                    bikeName: value?.bikeName || "",
                    approveBy: value?.approveBy || null,
                    reason: value?.reason || null,
                };
            })
            : [];

    const rejectedTabData =
        rejectTabResponse !== undefined
            ? rejectTabResponse.map((value, index) => {
                return {
                    record_ID: value.id || null,
                    Merchant_Name: value.merchant || null,
                    Bike_Maker: value.bikeMaker || null,
                    Bike_Model: value.bikeModel || null,
                    Preview_Image:
                        value.bikeImage === undefined || value.bikeImage === [] || value.bikeImage === null
                            ? `/assets/img/car_placeholder.png`
                            : value.bikeImage,
                    modelData: value.modelData || null,
                    manufacturerData: value.manufacturerData || null,
                    bikeId: value.bikeId || null,
                    create_at: value.create_at || null,
                    bikeName: value.bikeName || "",
                    approveBy: value.approveBy || null,
                    reason: value.reason || null,
                };
            })
            : [];

    return {
        props: {
            tableData: tableData,
            pendingTabData: pendingTabData,
            approvedTabData: approvedTabData,
            rejectedTabData: rejectedTabData,
        },
    };
}

async function getRejectedApproval() {
    const data = await prisma.BikesApp_bikeapprovallog.findMany({
        where: {
            status: "R",
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
                },
            },
            UsersApp_customuser: {
                select: {
                    first_name: true,
                    last_name: true,
                },
            },
        },
    }).catch((err) => {
        throw new Error(err);
    });

    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    const endResultData =
        parsedData != undefined?
            parsedData.map(async (value) => {
                const first_name = value?.BikesApp_bike?.UsersApp_customuser?.first_name;
                const last_name = value?.BikesApp_bike?.UsersApp_customuser?.last_name;

                const approvalFirstName = value?.UsersApp_customuser?.first_name || "UNKNOWN";
                const approvalLastName = value?.UsersApp_customuser?.last_name || "NAME";

                const bikeID = value?.BikesApp_bike?.id;
                let img = null;
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

                return {
                    id: value?.id,
                    bikeModel: value?.BikesApp_bike?.BikesApp_bikemodel?.model_name,
                    bikeImage: img,
                    bikeMaker: value?.BikesApp_bike?.BikesApp_bikemanufacturer?.maker_name,
                    merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
                    approveBy: `${approvalFirstName} ${approvalLastName}`,
                    modelData: value?.BikesApp_bike?.BikesApp_bikemodel,
                    manufacturerData: value?.BikesApp_bike?.BikesApp_bikemanufacturer,
                    bikeId: value?.bike_id_id,
                    create_at: value?.created_at,
                    bikeName: value?.BikesApp_bike?.bike_name,
                    reason: value?.review,
                };
            })
            : [];

    const d = Promise.all(endResultData.map((item) => item));

    return d;
}

async function getApproveApproval() {
    const data = await prisma.BikesApp_bikeapprovallog.findMany({
        where: {
            status: "A",
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
                },
            },
            UsersApp_customuser: {
                select: {
                    first_name: true,
                    last_name: true,
                },
            },
        },
    }).catch((err) => {
        throw new Error(err);
    });

    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    const endResultData =
        parsedData != undefined?
            parsedData.map(async (value) => {
                const first_name = value?.BikesApp_bike?.UsersApp_customuser?.first_name;
                const last_name = value?.BikesApp_bike?.UsersApp_customuser?.last_name;

                const approvalFirstName = value?.UsersApp_customuser?.first_name || "UNKNOWN";
                const approvalLastName = value?.UsersApp_customuser?.last_name || "NAME";

                const bikeID = value?.BikesApp_bike?.id;
                let img = null;
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

                return {
                    id: value?.id,
                    bikeModel: value?.BikesApp_bike?.BikesApp_bikemodel?.model_name,
                    bikeImage: img,
                    bikeMaker: value?.BikesApp_bike?.BikesApp_bikemanufacturer?.maker_name,
                    merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
                    approveBy: `${approvalFirstName} ${approvalLastName}`,
                    modelData: value?.BikesApp_bike?.BikesApp_bikemodel,
                    manufacturerData: value?.BikesApp_bike?.BikesApp_bikemanufacturer,
                    bikeId: value?.bike_id_id,
                    create_at: value?.created_at,
                    bikeName: value?.BikesApp_bike?.bike_name,
                    reason: value?.review,
                };
            })
            : [];

    const d = Promise.all(endResultData.map((item) => item));

    return d;
}

async function getPendingApprove() {
    const data = await prisma.BikesApp_bikeapprovallog.findMany({
        where: {
            status: "P",
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
                },
            },
            UsersApp_customuser: {
                select: {
                    first_name: true,
                    last_name: true,
                },
            },
        },
    }).catch((err) => {
        throw new Error(err);
    });

    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    const endResultData =
        parsedData != undefined?
            parsedData.map(async (value) => {
                const first_name = value?.BikesApp_bike?.UsersApp_customuser?.first_name;
                const last_name = value?.BikesApp_bike?.UsersApp_customuser?.last_name;

                const approvalFirstName = value?.UsersApp_customuser?.first_name || "UNKNOWN";
                const approvalLastName = value?.UsersApp_customuser?.last_name || "NAME";

                const bikeID = value?.BikesApp_bike?.id;
                let img = null;
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

                return {
                    id: value?.id,
                    bikeModel: value?.BikesApp_bike?.BikesApp_bikemodel?.model_name,
                    bikeImage: img,
                    bikeMaker: value?.BikesApp_bike?.BikesApp_bikemanufacturer?.maker_name,
                    merchant: `${first_name == null ? "UNKNOWN" : first_name} ${last_name == null ? "NAME" : last_name}`,
                    approveBy: `${approvalFirstName} ${approvalLastName}`,
                    modelData: value?.BikesApp_bike?.BikesApp_bikemodel,
                    manufacturerData: value?.BikesApp_bike?.BikesApp_bikemanufacturer,
                    bikeId: value?.bike_id_id,
                    create_at: value?.created_at,
                    bikeName: value?.BikesApp_bike?.bike_name,
                    reason: value?.review,
                };
            })
            : [];

    const d = Promise.all(endResultData.map((item) => item));

    return d;
}

BikeApprovalIndexPage.layout = Admin;
BikeApprovalIndexPage.auth = true;

export default BikeApprovalIndexPage;
