import {useRouter} from 'next/router'

import React from "react";
import Admin from "../../../../layouts/Admin";
import CardBody from "../../../../components/Card/CardBody";
import CardHeader from "../../../../components/Card/CardHeader";
import Card from "../../../../components/Card/Card";
import Icon from "@mui/material/Icon";
import CancelIcon from "@mui/icons-material/Cancel";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PendingIcon from "@mui/icons-material/Pending";
import {Container} from "@mui/material";
import CardIcon from "../../../../components/Card/CardIcon";

function HistoryLog(props) {
    const router = useRouter();
    const car_id = parseInt(router.query.id);

    const historyCard = () => {
        if(props.historys === null) return
        return props.historys.map(data => {
           return  <>
                {data.status === "A" &&
                    <Card>
                        <CardHeader className="font-semibold" color="success" stats plain>
                            <CardIcon color="dark">
                                <Icon>done</Icon>
                            </CardIcon>
                            Approved Request
                        </CardHeader>
                        <CardBody>
                            <div className="font-semibold">AprrovedBy</div>
                            <div>{"-"}</div>
                            <br/>
                            <div className="font-semibold">Approved when</div>
                            <div>{data.updated_at || "-"}</div>
                            <br/>
                            <div className="font-semibold">Reason</div>
                            <div>{data.updated_at || "-"}</div>
                        </CardBody>
                    </Card>
                }

                {data.status === "R" &&
                    <Card>
                        <CardHeader className="font-semibold" color="danger" stats plain>
                            Rejected Request
                            <CardIcon color="dark">
                            <Icon>cancel</Icon>
                            </CardIcon>

                        </CardHeader>
                        <CardBody>
                            <div className="font-semibold">RejectedBy</div>
                            <div>{"-"}</div>
                            <br/>
                            <div className="font-semibold">Rejected when</div>
                            <div>{data.updated_at || "-"}</div>
                            <br/>
                            <div className="font-semibold">Reason</div>
                            <div>{data.updated_at || "-"}</div>
                        </CardBody>
                    </Card>
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
                        <div>{"-"}</div>
                        <br/>
                        <div className="font-semibold">
                            Requested when
                        </div>
                        <div>
                            {data.created_at || "-"}
                        </div>
                    </CardBody>
                </Card>
            </>
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
    console.log("history",historys)
    return {
        props: {
            historys: historys || null
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
    }).catch((err) => {
        throw new Error(err);
    });

    const parsedData = JSON.parse(
        JSON.stringify(data, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    return parsedData;
}

HistoryLog.layout = Admin;

export default HistoryLog;