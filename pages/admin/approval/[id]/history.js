import {useRouter} from 'next/router'

import React from "react";
import Admin from "../../../../layouts/Admin";
import CardBody from "../../../../components/Card/CardBody";
import CardHeader from "../../../../components/Card/CardHeader";
import Card from "../../../../components/Card/Card";
import Icon from "@mui/material/Icon";
import {Container} from "@mui/material";
import CardIcon from "../../../../components/Card/CardIcon";


function HistoryLog(props) {
    const router = useRouter();
    const car_id = parseInt(router.query.id);

    const historyCard = () => {
        if(props.historys === null) return
        return props.historys.map(data => {
           return ( <>
                {data.status === "A" &&
                    <>
                        <Card>
                            <CardHeader className="font-semibold" color="success" stats plain>
                                <CardIcon color="dark">
                                    <Icon>done</Icon>
                                </CardIcon>
                                Approved Request
                            </CardHeader>
                            <CardBody>
                                <div className="font-semibold">ApprovedBy</div>
                                <div>{`${data?.UsersApp_customuser?.first_name} ${data?.UsersApp_customuser?.last_name}` || "-"}</div>
                                <br/>
                                <div className="font-semibold">Approved when</div>
                                <div>{data?.updated_at || "-"}</div>
                                <br/>
                                <div className="font-semibold">Reason</div>
                                <div>{data?.review || "-"}</div>
                            </CardBody>
                        </Card>
                        <br/>
                    </>

                }

                {data.status === "R" &&
                    <>
                        <Card>
                            <CardHeader className="font-semibold" color="danger" stats plain>
                                Rejected Request
                                <CardIcon color="dark">
                                    <Icon>cancel</Icon>
                                </CardIcon>

                            </CardHeader>
                            <CardBody>
                                <div className="font-semibold">RejectedBy</div>
                                <div>{`${data?.UsersApp_customuser?.first_name} ${data?.UsersApp_customuser?.last_name}` || "-"}</div>
                                <br/>
                                <div className="font-semibold">Rejected when</div>
                                <div>{data?.updated_at || "-"}</div>
                                <br/>
                                <div className="font-semibold">Reason</div>
                                <div>{data?.review || "-"}</div>
                            </CardBody>
                        </Card>
                        <br/>
                    </>
                }

                <Card>
                    <CardHeader className="font-semibold" color="warning" stats plain>
                        Pending Request
                        <CardIcon color="dark">
                        <Icon>pending</Icon>
                        </CardIcon>
                    </CardHeader>
                    <CardBody>
                        <div className="font-semibold">RequestedBy</div>
                        <div>{props.merchantName}</div>
                        <br/>
                        <div className="font-semibold">
                            Requested when
                        </div>
                        <div>
                            {data.created_at || "-"}
                        </div>
                    </CardBody>
                </Card>
            </>);
        });
    }
    return (
       <Container>
           {historyCard()}
       </Container>
    )
}

export async function getServerSideProps(context) {
    const car_id = parseInt(context.params.id);
    const historys = await getHistory(car_id);
    const merchantName = await getMerchantName(car_id);
    return {
        props: {
            historys: historys || null,
            merchantName: merchantName
        }
    }
}

async function getHistory(id) {
    const data = await prisma.CarsApp_carapprovallog.findMany({
        orderBy: {
            updated_at: 'desc'
        },
        where: {
            car_id_id: id,
        },
        include: {
            UsersApp_customuser: true
        }
    }).catch((err) => {
        throw new Error(err);
    });

    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    return parsedData;
}

async function getMerchantName(car_id) {
    const data = await prisma.CarsApp_car.findUnique({
        where: {
            id:car_id
        },
        include: {
            UsersApp_customuser: true
        }
    });
    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    return `${parsedData.UsersApp_customuser.first_name} ${parsedData.UsersApp_customuser.last_name}` || "-";
}

HistoryLog.layout = Admin;
HistoryLog.auth = true;

export default HistoryLog;