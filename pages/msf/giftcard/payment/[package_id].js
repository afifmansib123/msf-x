import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

function GiftCardPayment(props) {
    const router = useRouter();
    const package_id = parseInt(router.query.package_id);
    const { data: session, status } = useSession();
    const { token } = session;
    const { id } = token;

    const buyPackage = (subPackage) => async (e) => {
        // console.log(subPackage);

        const dataParams = {
            total_amount: subPackage.price, // the amount goes to SSL checkout page
            user_id: session.token.id,
            package_id: subPackage.id,
            cus_name: session.token.name,
            cus_city: "",
            cus_country: "Bangladesh",
            shipping_method: "NO",
            multi_card_name: "",
            num_of_item: 1,
            product_name: `BG Subscription Package - ${subPackage.package_name}`,
            product_category: "Service",
            product_profile: "General",
        };
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BG_API}merchant-storefront/add-payment-history/`,
            dataParams
        );
        window.location = response.data.GatewayPageURL;
    }

    React.useEffect(() => {
        // router.push('/api/gift?status=success&&trn=sdakdaskdj12321321');
        // router.push('/api/gift?status=fail&&trn=sdakdaskdj12321321');
        console.log(package_id)

    }, []);

    return (
        <Container>
            <h1>Redirecting to Payment Gateway</h1>
        </Container>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {

        }
    }
}

export default GiftCardPayment;