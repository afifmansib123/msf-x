import * as React from "react";
import axios from "axios";
import { useRouter } from "next/router";
// import { PrismaClient } from "@prisma/client";
import prisma from "/PrismaConnect";
import { useSession } from "next-auth/react";


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
import SaveIcon from '@mui/icons-material/Save';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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
    const [totalPage, setTotalPage] = React.useState(1);
    const [messagesList, setMessagesList] = React.useState([]);
    const [updateId, setUpdateId] = React.useState();
    const [status, setStatus] = React.useState();
    const [checked1, setChecked1] = React.useState(true);
    const [checked2, setChecked2] = React.useState(true);
    const { data: session, status1 } = useSession();

    function timeFormat(time) {
        let newTime = (new Date(time).toLocaleString("en-GB", { timeZone: "UTC" })).replace(",", " ");
        return newTime;
    }

    const handleChange = (e, value) => {
        setPage(value);
    };

    


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

    function handleUpdate(id, status) {
        setUpdateId(id);
        setStatus(status)
    }

    async function handleSave(mid) {
        const token = session.accessToken;
        try {
            let res = await axios.patch(`/api/contactus/${mid}/`, {
                status: status,
            })
        } catch (e) {
            alert("Something went wrong. Please contact IT.");
            console.log(e);
        }

        setUpdateId(null);
        setStatus(null)

    }

    function handleChange2(e) {
        setStatus(e)
    }

    const handleChange3 = (event) => {
        setChecked1(event.target.checked);
    };
    const handleChange4 = (event) => {
        setChecked2(event.target.checked);
    };


    const loadPageTitle = async () => {
        const messageCount = await axios.get(`/api/contactus/pageNumber?page=${page}&filter1=${checked1}&filter2=${checked2}`)
        console.log("data count", messageCount.data.data)
        setTotalPage(Math.ceil((messageCount.data.data) / 6));
        setPage(1);
    }

    React.useEffect(async () => {
        await loadPageTitle();
    }, [status, checked1, checked2])



    React.useEffect(() => {
        const response = axios.get(`/api/contactus?page=${page}&filter1=${checked1}&filter2=${checked2}`).then((v) => {
            
            
            let { messages } = v.data;
            messages = messages || [];

            let result = messages.map((m, index) => {
                return (
                    <TableBody key={index}>
                        <TableRow   >
                            <StyledTableCell align="center">{m.user_id_id}</StyledTableCell>
                            <StyledTableCell>{m.subject}</StyledTableCell>
                            <StyledTableCell>{m.message}</StyledTableCell>
                            {
                                updateId != m.id ?
                                    <StyledTableCell align="center">{m.status}</StyledTableCell> :
                                    <StyledTableCell align="center">
                                        <select value={status} onChange={e => handleChange2(e.target.value)} class="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                            <option value="waiting">waiting</option>
                                            <option value="solved">solved</option>
                                        </select>
                                    </StyledTableCell>
                            }


                            <StyledTableCell align="center">{timeFormat(m.created_at)}</StyledTableCell>
                            <StyledTableCell align="center">{timeFormat(m.updated_at)}</StyledTableCell>
                            <StyledTableCell align="center">


                                {updateId != m.id ?
                                    <IconButton aria-label="clear" onClick={() => { handleUpdate(m.id, m.status) }}>
                                        <EditIcon />
                                    </IconButton> :
                                    <IconButton aria-label="clear" onClick={() => { handleSave(m.id) }}>
                                        <SaveIcon />
                                    </IconButton>
                                }

                            </StyledTableCell>
                        </TableRow>
                    </TableBody>
                )
            })
            setMessagesList(result)
            
        })

    }, [page, updateId, status, checked1, checked2]);

    return (
        <>
            {/* <h1 className="text-2xl font-bold">Listing Waiting for Review</h1> */}

            {/* Messages Table */}
            <h1 className="text-4xl font-semibold text-center mb-4">
                Messages
            </h1>

            <div>

                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={checked1} onChange={handleChange3} name="gilad" />}
                        label="waiting"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={checked2} onChange={handleChange4} name="gilad" />}
                        label="solved"
                    />
                </FormGroup>

            </div>




            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" style={{width: '5%'}}>ID</StyledTableCell>
                                    <StyledTableCell align="center" style={{width: '20%'}}>Subject</StyledTableCell>
                                    <StyledTableCell align="center">Message</StyledTableCell>
                                    <StyledTableCell align="center" style={{width: '10%'}}>Status</StyledTableCell>
                                    <StyledTableCell align="center" style={{width: '12%'}}>Created at</StyledTableCell>
                                    <StyledTableCell align="center" style={{width: '12%'}}>Update At</StyledTableCell>
                                    <StyledTableCell align="center" style={{width: '5%'}}></StyledTableCell>
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
    // const prisma = new PrismaClient();
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
