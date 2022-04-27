import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import LoginForm from "/components/LoginForm"

export async function getStaticProps(context) {
  console.log("LANDING_PAGE", process.env.LANDING_PAGE);
  return {
    props: {
      landingPage: process.env.LANDING_PAGE ? process.env.LANDING_PAGE : null,
    },
  };
}

function Index(props) {
  const { landingPage } = props;
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const router = useRouter();
  // Only for CSR
  // const queryClient = useQueryClient()
  // const query = useQuery('todos', getTodos)

  React.useEffect(() => {
    // Router.push("/admin/dashboard");
    if (router.query["error"] == "SessionRequired") {
      setError("Must Login");
    }

    if (session) {
      console.log("Index", session);
      router.push("/msf");
    }

    // Only force direct to certain development section
    if (landingPage) {
      Router.push(landingPage);
    }
  });

  const handleSignIn = (cred) => {
    console.log("Index handleSignIn", cred);
    signIn("credentials", {
      username: cred.username,
      password: cred.password,
      callbackUrl: "/msf/dashboard",
    });
  };

  // TODO Show default MSF page

  return (
    <div className="m-10">
      {error}
      {landingPage && <p>Landing page: {landingPage}</p>}
      <h1 className="text-2xl text-green">Merchant Storefront</h1>
      <div className="grid grid-cols-1">
        <LoginForm title="Member Signin" onSignIn={handleSignIn} />
      </div>
      <a href="/">Main</a>
      <a href="/about">About</a>
    </div>
  );
}

export default Index;
