import React from "react";
import { useRouter } from "next/router";
import MSF from "layouts/MSF.js";
import { useSession } from "next-auth/react";
import { Button, CardContent, Container, Divider } from "@mui/material";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CustomButton from '../../../components/CustomButtons/Button'
import { PrismaClient } from "@prisma/client";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react'
import { getGiftPackage } from '../../api/gift/packages'



function CurrentGiftCard(props) {

    const router = useRouter();
    const { data: session, status } = useSession();
    const { error, message } = router.query;
    const { packages } = props;
    const { merchantPac } = props;
    // console.log("token id", session);

    // console.log("packagesType", props.packagesType)
    // console.log("allPackage", props.allPackage)
    // console.log("myPerk", props.perks)
    // console.log("merchantPac", merchantPac)


    const [errorDialog, setOpenDialog] = React.useState(false);

    // React.useEffect(() => {
    //     if (error) {
    //         setOpenDialog(true)
    //         console.log("err case")
    //         console.log("hello world")
    //     } else {
    //         setOpenDialog(false)
    //     }
    // }, [])


    // const onBuyClicked = () => {
    //     console.log("test clicked")
    // }


    const [isLoading, setIsLoading] = useState(false)
    const [packagesID, setPackageID] = useState([])

    function getPackage() {
        var a = []
        for (let i = 0; i < props.packagesType.length; i++) {
            var myPackageID = props.allPackage.filter(function (el) {
                return (el.package_id_id == parseInt(props.packagesType[i].package_id_id));
            });

            a.push(myPackageID)
        }
        return a;
    }


    function showName(x) {
        const z = props.merchantPac.filter(function (el) {
            return (el.id == parseInt(x));
        })
        return z[0].package_name;
    }
    function renderPerk(serial_num) {
        const renderPerkItems = props.perks.filter(function (el) {
            return (el.serial == serial_num)
        })
        // console.log("renderPerk", renderPerkItems)

        return renderPerkItems;
    }



    const renderPackageItems = getPackage().map((item, i) => {
        // console.log("item", item)
        return (
            item.map((subItem, y) => {
                // console.log("subItem", subItem)
                return (
                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader color={"bhalogari"} className={"m-3"}>
                                <h1 className="text-center text-xl font-semibold">
                                    {/* Package ID Type{subItem.package_id_id} */}

                                    {showName(subItem.package_id_id)}
                                </h1>
                            </CardHeader>

                            <CardBody>
                                <CardContent className="text-center my-[50px]">
                                    {renderPerk(subItem.serial_no).map((item, i) => {
                                        return (
                                            <>
                                                <br />
                                                <div>{item.MerchantStorefront_perks.perks}</div>
                                                <div>{`(remain ${item.amount_remain - item.amount_used})`}</div>
                                                <br />
                                                {
                                                    (renderPerk(subItem.serial_no).length - 1) !== i && <Divider />
                                                }
                                            </>
                                        )
                                    })}
                                </CardContent>
                            </CardBody>

                            <CardFooter>
                                <div>
                                    <div>
                                        Serial number: {subItem.serial_no}
                                    </div>
                                    <div>
                                        Created date: {renderPerk(subItem.serial_no)[0].created_at}
                                    </div>
                                    <div>
                                        Expired date: {renderPerk(subItem.serial_no)[0].expired_at}
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>


                )
            })
        )

    })




    return (
        <div>
            {
                renderPackageItems.length > 0 ?
                    <div>
                        <Container>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <h1 className={"text-center text-bold text-5xl font-bold text-bhalogari"} >My Giftcards</h1>
                                </GridItem>

                                {renderPackageItems}

                            </GridContainer>

                        </Container>

                    </div>
                    :
                    <div>
                        <Container>
                            <GridContainer>

                                <GridItem xs={12} sm={12} md={12}>
                                    you don't have any give card yet.
                                </GridItem>

                            </GridContainer>

                        </Container>
                    </div>
            }
        </div>

    )
}

export async function getServerSideProps(context) {
    const prisma = new PrismaClient();
    const id = context.params.id

    const packages = await getGiftPackage() || [];



    var myPackageTypes = await prisma.MerchantStorefront_merchantpackage.groupBy({
        by: ['package_id_id'],
        where: {
            user_id_id: parseInt(id)
        }
    })


    var myAllPackage = await prisma.MerchantStorefront_merchantpackage.findMany({ where: { user_id_id: parseInt(id) } })

    var allPerkHistory = await prisma.MerchantStorefront_merchantperkhistory.findMany({
        // where: { perk_id_id: parseInt(id) },
        include: {
            MerchantStorefront_perks: true
        }
    })

    var merchantPackage = await prisma.MerchantStorefront_package.findMany()

    //bam work
    // var mPackages = await prisma.MerchantStorefront_merchantpackage.findMany({
    //     where: {
    //         user_id_id: parseInt(id)
    //     },

    //     include: {
    //         MerchantStorefront_package: true
    //     }
    // }) || [];
    // mPackages = JSON.parse(
    //     JSON.stringify(mPackages, (key, value) => (typeof value === "bigint" ? perseInt(value) : value))
    // );

    // let finalData = mPackages.map(async mpackage => {
    //     let package_perk = await prisma.MerchantStorefront_perk_history.findMany({
    //         where: {
    //             serial_number: mpackage.serial_no
    //         },
    //         include: {
    //             MerchantStorefront_perks: true
    //         }
    //     })

    //     package_perk = JSON.parse(
    //         JSON.stringify(mPackages, (key, value) => (typeof value === "bigint" ? perseInt(value) : value))
    //     );

    //     return {
    //         package_id: mpackage.package_id_id,
    //         package_name: mpackage.MerchantStorefront_package.package_name,
    //         serial_number: mpackage.serial_no,
    //         package_perk: package_perk
    //     }
    // });

    // finalData = Promise.all(finalData.map((item) => item));



    // findMany({

    //     .....,

    //     include: {

    //     MerchantStorefront_perks: true

    //     }

    //     });

    // console.log(myPackageTypes);

    //see what packageType that they buy.
    myPackageTypes = JSON.parse(
        JSON.stringify(myPackageTypes, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );


    //see all package that user has.
    myAllPackage = JSON.parse(
        JSON.stringify(myAllPackage, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    allPerkHistory = JSON.parse(
        JSON.stringify(allPerkHistory, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );

    merchantPackage = JSON.parse(
        JSON.stringify(merchantPackage, (key, value) => (typeof value === "bigint" ? value.toString() : value))
    );







    return {
        props: {
            packagesType: myPackageTypes.sort((a, b) => a.package_id_id - b.package_id_id),
            allPackage: myAllPackage,
            packages: packages,
            perks: allPerkHistory,
            merchantPac: merchantPackage
        },
    }
}

CurrentGiftCard.auth = true;
CurrentGiftCard.layout = MSF;
export default CurrentGiftCard;