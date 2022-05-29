import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Admin from "layouts/Admin.js";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CardFooter from "../../../../components/Card/CardFooter";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useRouter } from "next/router";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {green, orange} from "@mui/material/colors";

function MerchantPackageManagement(props) {
    const [managePackage, setPackage] = React.useState([]);
    const [packageComponent, setPackageComponent] = React.useState([]);
    const router = useRouter();
    let {id} = router.query;
    const [packageSelector, setPackageSelector] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const isPayment = [
        {
            value: true,
            label: "PAID"
        },
        {
            value: false,
            label: "UNPAID"
        },
    ]

    const [paymentMethod, setPaymentMethod] = React.useState([]) ;

    const handlePackageChange = (item, index, type, e) => {
        if (type === "package") {
            managePackage[index].package = e.target.value;
        } else if (type === "gift") {
            managePackage[index].is_paid = e.target.value;
        } else {
            managePackage[index].payment_method = e.target.value;
        }
        setPackage(managePackage);
    }

    React.useEffect(async () => {
        try {
            let response = await axios.get(`../../../api/managePackage`);
            let {data} = response;
            setPackageSelector(data.package_data);
            setPaymentMethod(data.payment_method_data);
        } catch (e) {
            console.error(e)
        }

    }, []);

    React.useEffect(() => {
        const componentPackage = managePackage.map((v,index) => {
            return (
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    className={"my-8"}
                >
                    <div className={"grid grid-cols-4"} key={index}>
                        <div className={'mr-4'} >
                            <TextField
                                select
                                label="Package/Gift"
                                fullWidth
                                defaultValue={v.package}
                                onChange={(e) => handlePackageChange(v, index, "package", e)}
                                helperText="Please select your package/gift">
                                {packageSelector.map((option) => (
                                    <MenuItem key={option.value} value={option}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div className={'mr-4'}>
                            <TextField
                                select
                                label="Payment Method"
                                fullWidth
                                defaultValue={v.payment_method}
                                onChange={(e) => handlePackageChange(v, index, "paymentMethod", e)}
                                helperText="Please select your payment method">
                                {paymentMethod.map((option) => (
                                    <MenuItem key={option.value} value={option}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div>
                            <TextField
                                select
                                label="Payment Status"
                                fullWidth
                                defaultValue={v.is_paid.value}
                                onChange={(e) => handlePackageChange(v, index, "gift", e)}
                                helperText="Please select your package/gift">
                                {isPayment.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>

                </Box>
            )
        });
        setPackageComponent(componentPackage);

    }, [managePackage]);

    const handleDelete = () => {
        // packageComponent.splice(index,1);
        // setPackageComponent(packageComponent);
        // managePackage.splice(index,1);
        // setPackage([...managePackage]);
        let copycompo = [...managePackage];
        copycompo.pop();
        setPackage(copycompo);
    }

    const onAddPackageClick = () => {
        // packageName packagepaid status
        const newPackageData = {
            package: packageSelector[0],
            is_paid: isPayment[0],
            payment_method: paymentMethod[0]
        }
        const copyData = [...managePackage];
        copyData.push(newPackageData);
        setPackage(copyData);
    }

    const onSavePackageManagement = async () => {
        if (managePackage.length > 0) {
            const dataParams = {
                data: managePackage,
                user_id: id
            }
            //load animation
            setSuccess(false);
            setLoading(true);

            const response = await axios.post(
                `/api/managePackage`,
                dataParams
            );

            //end load animation
            setSuccess(true);
            setLoading(false);

            if (response.status === 200) {
                await router.replace('../../../admin/merchants?res_status=success&message=successful add package/gift to the user&title=Package/Gift Add Successful');
            } else {
                await router.replace('../../../admin/merchants?res_status=fail&message=please contract admin.&title=Something went wrong, Add Unsuccessful');
            }
        } else {
            alert("No package/gift add yet");
        }
    }

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color={"bhalogari"} className={"m-3"}>
                            <h1 className="text-left text-xl font-semibold">Package Management</h1>
                        </CardHeader>
                        <CardBody>
                            <Button className={"text-bhalogari"} onClick={onAddPackageClick}>
                                <div>
                                    <AddCircleIcon/>
                                </div>

                            </Button>

                            <Button  className={"text-bhalogari"} onClick={() => {
                                handleDelete()
                            }}>
                                <RemoveCircleIcon/>
                            </Button>
                            <div className={"mt-8"}>
                                {packageComponent}
                            </div>
                        </CardBody>
                        <div className={"mx-10 my-5"}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ m: 1, position: 'relative' }}>
                                    <Button
                                        variant="contained"
                                        disabled={loading}
                                        onClick={onSavePackageManagement}
                                        className={"bg-bhalogari"}
                                    >
                                        SAVE
                                    </Button>
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: orange[500],
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    )}
                                </Box>
                                {/*<Button className={"bg-bhalogari mr-4"} variant={"contained"} onClick={onSavePackageManagement}>*/}
                                {/*    SAVE*/}
                                {/*</Button>*/}
                                <Box sx={{ m: 1, position: 'relative' }}>
                                    <Button className={"text-bhalogari"} variant={"text"} href={`/admin/merchants/`}>
                                        CANCEL
                                    </Button>
                                </Box>
                            </Box>

                        </div>
                    </Card>
                </GridItem>
            </GridContainer>
        </>
    )
}
MerchantPackageManagement.layout = Admin;
MerchantPackageManagement.auth = true;

export default MerchantPackageManagement;