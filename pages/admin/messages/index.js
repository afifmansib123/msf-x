import * as React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

// @mui/icons-material
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import EditIcon from '@mui/icons-material/Edit';

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

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

function MessagesPage(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [messagesList, setMessagesList] = React.useState([]);
    const router = useRouter();

    function timeFormat(time) {
        let newTime = (new Date(time).toLocaleString("en-GB", { timeZone: "UTC" })).replace(",", " ");
        return newTime;
    }

    const handleChange = (e, value) => {
        setPage(value);
    };
    const totalCount = props.totalMessage || 0;
    const totalPage = Math.ceil(totalCount / 5) - 1;

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#ff6600",
            color: "#ffff",
            fontWeight: "bold",
            fontSize: 16,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,

        },
    }));


    React.useEffect(() => {
        const response = axios.get(`/api/contactus?page=${page}`).then((v) => {
            let { messages } = v.data;
            console.log("in dashboard1", messages)
            messages = messages || [];
            console.log("in dashboard2", messages)

            let result = messages.map((m, index) => {
                console.log(m);
                return (
                    <TableBody key={index}>
                        <TableRow   >
                            <StyledTableCell>{m.user_id_id}</StyledTableCell>
                            <StyledTableCell>{m.subject}</StyledTableCell>
                            <StyledTableCell>{m.message}</StyledTableCell>
                            {
                                m.status !== null ?
                                    <StyledTableCell>{m.status}</StyledTableCell> :
                                    <StyledTableCell>null</StyledTableCell>
                            }
                            <StyledTableCell>{timeFormat(m.created_at)}</StyledTableCell>
                            <StyledTableCell>{timeFormat(m.updated_at)}</StyledTableCell>
                            <StyledTableCell>
                                <IconButton aria-label="clear" onClick={() => { }}>
                                    <EditIcon />
                                </IconButton>
                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                )
            })
            setMessagesList(result)
            console.log(messages)
        })

    }, [page]);

    return (
        <>
            {/* <h1 className="text-2xl font-bold">Listing Waiting for Review</h1> */}

            {/* Messages Table */}
            <h1 className="text-4xl font-semibold text-center mb-4">
                Messages
            </h1>

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell>Subject</StyledTableCell>
                                    <StyledTableCell>Message</StyledTableCell>
                                    <StyledTableCell>Status</StyledTableCell>
                                    <StyledTableCell>Created at</StyledTableCell>
                                    <StyledTableCell>Update At</StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            {messagesList}

                        </Table>
                    </TableContainer>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <div className={"text-center"}>
                        <Stack spacing={2} className={"items-center"}>
                            <Typography>Page: {page}</Typography>
                            <Pagination count={totalPage} page={page} onChange={handleChange} showFirstButton showLastButton size="large" />
                        </Stack>
                    </div>
                </GridItem>
            </GridContainer>



        </>
    );
}

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    let messageCount = await prisma.MerchantStorefront_messagetoadmin.count();

    return {
        props: {
            totalMessage: messageCount,
        }
    }

}

MessagesPage.layout = Admin;
MessagesPage.auth = true
export default MessagesPage;
