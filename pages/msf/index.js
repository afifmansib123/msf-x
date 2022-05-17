import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import LoginForm from "/components/LoginForm";

function Index(props) {
  // const { landingPage } = props;
  // const { data: session } = useSession();
  // const [error, setError] = useState("");
  const router = useRouter();
  const { error } = router.query;
  // Only for CSR
  // const queryClient = useQueryClient()
  // const query = useQuery('todos', getTodos)

  React.useEffect(() => {
    // Router.push("/admin/dashboard");
    if (router.query["error"] == "SessionRequired") {
      console.log(router.query);
    }
  }, []);

  const handleSignIn = (cred) => {
    console.log("Index handleSignIn", cred);
    signIn("credentials", {
      username: cred.username,
      password: cred.password,
      callbackUrl: "/msf/dashboard",
    }).then((ret) => {
      console.log("handleSignIn.ret", ret);
    });
  };

  // TODO Show default MSF page

  return (
    <div className="m-10">
      {error && (
        <div>
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      )}
      <h1 className="text-2xl text-green">Merchant Storefront</h1>
      <div className="grid grid-cols-1">
        <LoginForm title="Member Signin" onSignIn={handleSignIn} />
      </div>
      <Link href="/">Back to Store</Link>
       </div>
      )
     }


export async function getStaticProps(context) {
  // console.log("LANDING_PAGE", process.env.LANDING_PAGE);
  return {
    props: {
      // landingPage: process.env.LANDING_PAGE ? process.env.LANDING_PAGE : null,
    },
  };
}

export default Index;
