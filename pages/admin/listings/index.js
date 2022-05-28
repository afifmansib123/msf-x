import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import makeStyles from '@mui/styles/makeStyles';
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "axios";
import Typography from "@mui/material/Typography";
// import prisma from "PrismaConnect";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import {AppBar, Button, CardContent, Container, List, ListItem, ListItemText} from "@mui/material";

import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CusButton from "../../../components/CustomButtons/Button";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TableList(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [cars, setCars] = React.useState([]);
    const [dialogCars, setDialogCars] = React.useState([]);
    const [loading, setOnload] = React.useState(false);
    const [dialogLoading , setOnDialogLoading] = React.useState(false);
    const router = useRouter();
    const [state, setState] = React.useState({
        Approved: false,
        Rejected: false,
        Pending: false,
    });
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const [searchTitle, setSearchTitle] = React.useState("");
    const [searchState, setSearchState] = React.useState({
        Storename: true,
        MerchantName: false
    });

    const handleChange = (e, value) => {
        setPage(value);
    };

    const onCheckChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    }

    const onSearchCheckChange = (event) => {
        setSearchState({
            ...searchState,
            [event.target.name]: event.target.checked,
        });
    }

    const { Approved, Rejected, Pending } = state;
    const { Storename, MerchantName } = searchState;

    const [totalPage, setTotalPage] = React.useState(1);

    const onDetailClick = async (car_id) => {
        // console.log(car_id)
        await router.push({ pathname: `/admin/listings/${car_id}` });
    };

    const error = [Storename, MerchantName].filter((v) => v).length === 0;

    const loadPageTitle = async () => {
        const carCount = await axios.get(`/api/cars/pageNumber?status=${JSON.stringify(state)}`)
        // console.log("data count", carCount.data.data)
        setTotalPage(Math.ceil((carCount.data.data) / 20));
        setPage(1);
    }

    const onSearch = (e)=> {
        console.log(e.target.value);
        setSearchTitle(e.target.value);
    }

    React.useEffect(async () => {
        if (searchTitle.trim() !== "") {
            // fetch the data from api
            setDialogOpen(true);
            setOnDialogLoading(true);
            const carlist = await axios.get(`/api/cars?searchTitle=${searchTitle}`);
            let { cars } = carlist.data;
            cars = cars ?? [];

            let result = cars.map((item, index) => {
                return (
                    <div key={index}>
                        <div className={"md:flex my-10"}>
                            <div className={"md:flex-row"}><img src={item.img[0]} width={250} /></div>
                            <div className={"md:flex-row md:ml-10 mt-8"}>
                                <div>
                                    <div className={"md:grid md:grid-cols"}>
                                        <span className={"font-semibold md:col"}>Car Name</span>
                                        <span className={""}>{item?.car?.car_name || "-"}</span>
                                    </div>
                                    <div className={"md:grid md:grid-cols"}>
                                        <span className={"font-semibold md:col"}>Store Name</span>
                                        <span className={""}>{item.store || '-'}</span>
                                    </div>
                                    <div className={"md:grid md:grid-cols"}>
                                        <span className={"font-semibold md:col"}>Merchant Name</span>
                                        <span className={""}>{`${item?.first_name} ${item?.last_name}`}</span>
                                    </div>
                                    <div className={"md:grid md:grid-cols"}>
                                        <span className={"font-semibold md:col"}>Status</span>
                                        <span>
                                        <CusButton disabled round color="warning" size="sm">
                                            {
                                                item?.status === "A" ? "Approved" : item?.status === "R" ? "Rejected" : "Pending"

                                            }
                                        </CusButton>
                                    </span>

                                    </div>
                                    <Button onClick={() => onDetailClick(item.car.id)}>Detail</Button>
                                </div>

                            </div>
                        </div>
                        {cars.length - 1 !== index && <Divider />}
                    </div>
                )
            })
            setOnDialogLoading(false);
            setDialogCars(result);
        } else {
            setDialogCars([]);
            setDialogOpen(false);
        }
    }, [searchTitle])

    React.useEffect(async () => {
        await loadPageTitle();
    }, [state])

    React.useEffect(async () => {
        setOnload(true);
        const carlist = await axios.get(`/api/cars?page=${page}&status=${JSON.stringify(state)}`);
        let { cars } = carlist.data;
        cars = cars || [];
        let result = cars.map((item, index) => {
            return (
                <div key={index}>
                    <div className={"md:flex my-10"}>
                        <div className={"md:flex-row"}><img src={item.img[0]} width={250} /></div>
                        <div className={"md:flex-row md:ml-10 mt-8"}>
                            <div>
                                <div className={"md:grid md:grid-cols"}>
                                    <span className={"font-semibold md:col"}>Car Name</span>
                                    <span className={""}>{item?.car?.car_name || "-"}</span>
                                </div>
                                <div className={"md:grid md:grid-cols"}>
                                    <span className={"font-semibold md:col"}>Store Name</span>
                                    <span className={""}>{item.store || '-'}</span>
                                </div>
                                <div className={"md:grid md:grid-cols"}>
                                    <span className={"font-semibold md:col"}>Merchant Name</span>
                                    <span className={""}>{`${item?.first_name} ${item?.last_name}`}</span>
                                </div>
                                <div className={"md:grid md:grid-cols"}>
                                    <span className={"font-semibold md:col"}>Status</span>
                                    <span>
                                        <CusButton disabled round color="warning" size="sm">
                                            {
                                                item?.status === "A" ? "Approved" : item?.status === "R" ? "Rejected" : "Pending"

                                            }
                                        </CusButton>
                                    </span>

                                </div>
                                <Button onClick={() => onDetailClick(item.car.id)}>Detail</Button>
                            </div>

                        </div>
                    </div>
                    {cars.length - 1 !== index && <Divider />}
                </div>
            )
        })
        setOnload(false);
        setCars(result);
    }, [page, state]);

    const handleChange = (e, value) => {
        setPage(value);
    };

    const onCheckChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    }

    const onSearchCheckChange = (event) => {
        setSearchState({
            ...searchState,
            [event.target.name]: event.target.checked,
        });
    }

    const { Approved, Rejected, Pending } = state;
    const { Storename, MerchantName } = searchState;

    const [totalPage, setTotalPage] = React.useState(1);

    const onDetailClick = async (car_id) => {
        // console.log(car_id)
        await router.push({ pathname: `/admin/listings/${car_id}` });
    };

    const error = [Storename, MerchantName].filter((v) => v).length === 0;

    const loadPageTitle = async () => {
        const carCount = await axios.get(`/api/cars/pageNumber?status=${JSON.stringify(state)}&searchTitle=${searchTitle}&searchState=${JSON.stringify(searchState)}`)
        // console.log("data count", carCount.data.data)
        setTotalPage(Math.ceil((carCount.data.data) / 20));
        setPage(1);
    }

    React.useEffect(async () => {
        await loadPageTitle();
    }, [state, searchTitle])

    React.useEffect(async () => {
        const carlist = await axios.get(`/api/cars?page=${page}&status=${JSON.stringify(state)}&searchTitle=${searchTitle}&searchState=${JSON.stringify(searchState)}`)
        let { cars } = carlist.data;
        cars = cars || [];
        let result = cars.map((item, index) => {
            return (
                <div key={index}>
                    <div className={"md:flex my-10"}>
                        <div className={"md:flex-row"}><img src={item.img[0]} width={250} /></div>
                        <div className={"md:flex-row md:ml-10 mt-8"}>
                            <div>
                                <div className={"md:grid md:grid-cols"}>
                                    <span className={"font-semibold md:col"}>Car Name</span>
                                    <span className={""}>{item?.car?.car_name || "-"}</span>
                                </div>
                                <div className={"md:grid md:grid-cols"}>
                                    <span className={"font-semibold md:col"}>Store Name</span>
                                    <span className={""}>{item.store || '-'}</span>
                                </div>
                                <div className={"md:grid md:grid-cols"}>
                                    <span className={"font-semibold md:col"}>Merchant Name</span>
                                    <span className={""}>{`${item?.first_name} ${item?.last_name}`}</span>
                                </div>
                                <div className={"md:grid md:grid-cols"}>
                                    <span className={"font-semibold md:col"}>Status</span>
                                    <span>
                                        <CusButton disabled round color="warning" size="sm">
                                            {
                                                item?.status === "A" ? "Approved" : item?.status === "R" ? "Rejected" : "Pending"

    return (
        <>
            <h2 className="text-4xl font-bold text-center mb-8 text-sky-700">CAR LISTING</h2>
            <div className={"text-center"}>
                <Stack spacing={2} className={"items-center"}>
                    <Pagination count={totalPage} page={page} onChange={handleChange} howFirstButton showLastButton
                        size="large" />
                    <Typography>Page: {page}</Typography>
                </Stack>
            </div>

            <Card>
                <CardContent>
                    {/*<div className={"border-b-[1px] px-8 border-b-gray-200"}>*/}
                    {/*    <div className={"mb-8"}>*/}
                    {/*        <h1 className={"text-2xl text-bold"}>Search By</h1>*/}
                    {/*        <div>*/}
                    {/*            <FormControl required error={error} component="fieldset">*/}
                    {/*                <FormLabel component="legend">Pick At least One</FormLabel>*/}
                    {/*                <FormHelperText hidden={!error}>Cannot search, Please check at least one</FormHelperText>*/}
                    {/*                <FormGroup row>*/}
                    {/*                    <FormControlLabel control={<Checkbox checked={Storename} name={"Storename"} onChange={onSearchCheckChange} />} label="StoreName" />*/}
                    {/*                    <FormControlLabel control={<Checkbox checked={MerchantName} name={"MerchantName"} onChange={onSearchCheckChange} />} label="MerchantName" />*/}
                    {/*                </FormGroup>*/}

                    {/*            </FormControl>*/}

                    {/*        </div>*/}
                    {/*        <TextField fullWidth label="Filter" id="fullWidth" disabled={error} error={error} onChange={(e) => {*/}
                    {/*            setSearchTitle(e.target.value)*/}
                    {/*        }} />*/}
                    {/*    </div>*/}

                    {/*</div>*/}

                    <div className={"border-b-[1px] px-8 border-b-gray-200"}>
                        <div className={"mb-8"}>
                            <h1 className={"text-2xl text-bold"}>Search</h1>
                            <TextField fullWidth value={searchTitle} onChange={ (e) => onSearch(e)}/>
                        </div>

                    </div>

                    <div className={"md:flex md:gap-5"}>
                        <div className={"md:flex-row  border-r-[1px] border-gray-200"}>
                            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                <FormLabel component="legend">Approve Status</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={Approved} onChange={onCheckChange} name="Approved" />
                                        }
                                        label="Approved"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={Rejected} onChange={onCheckChange} name="Rejected" />
                                        }
                                        label="Rejected"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={Pending} onChange={onCheckChange} name="Pending" />
                                        }
                                        label="Pending"
                                    />
                                </FormGroup>
                            </FormControl>
                        </div>

                        <div className={"flex-auto"}>
                            {
                                loading === true &&
                                <div className={"flex h-screen"}>
                                    <div className={"m-auto"}>
                                        <Box sx={{display: 'flex'}}>
                                            <CircularProgress/>
                                        </Box>
                                    </div>
                                </div>
                            }

                            <GridContainer>

                                <GridItem xs={12} sm={12} md={12}>
                                    {cars}
                                </GridItem>

                            </GridContainer>
                        </div>

                    </div>
                </CardContent>
            </Card>

            <div className={"text-center"}>
                <Stack spacing={2} className={"items-center"}>
                    <Pagination count={totalPage} page={page} onChange={handleChange} howFirstButton showLastButton
                        size="large" />
                    <Typography>Page: {page}</Typography>
                </Stack>
            </div>

            <div>
                <Dialog
                    fullScreen
                    open={dialogOpen}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar className={"py-5"}>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                <h1>
                                    Search
                                </h1>

                                <TextField className={"bg-white border-transparent focus:border-transparent focus:ring-0"} fullWidth value={searchTitle} onChange={ (e) => onSearch(e)} autoFocus/>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    { dialogLoading &&
                        <div className={"flex h-screen"}>
                            <div className={"m-auto"}>
                                <Box sx={{display: 'flex'}}>
                                    <CircularProgress/>
                                </Box>
                            </div>
                        </div>
                    }

                    { !dialogLoading &&
                        <List className={"p-10"}>
                            {dialogCars}
                        </List>
                    }
                </Dialog>
            </div>

        </>
    );
}

TableList.layout = Admin;
TableList.auth = true

export default TableList;
