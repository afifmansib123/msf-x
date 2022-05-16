import { Container } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
function GiftCardPayment(props) {
    const router = useRouter();
    React.useEffect(() => {
        // router.push('/api/gift?status=success&&trn=sdakdaskdj12321321');
        router.push('/api/gift?status=fail&&trn=sdakdaskdj12321321');
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