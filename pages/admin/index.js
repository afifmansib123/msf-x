import React from "react";
import Router from "next/router";
import { signIn } from "next-auth/react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import LoginForm from "/components/LoginForm";

export default function Index(props) {
  const { landingPage } = props;

  const handleSignIn = (cred) => {
    // TODO vertify credential
    console.debug("handleSignIn", cred);
    signIn("credentials", {
      username: cred.username,
      password: cred.password,
      callbackUrl: "/admin/dashboard",
    });
  };

  return (
    <div className="m-10" >
      <h1 className="text-2xl text-green" style={{fontFamily:"sans-serif", fontSize:"30px", marginBottom:"20px", marginTop:"20px"}}>BG Admin Panel</h1>
      <div className="grid grid-cols-1">
       <LoginForm title="Sign In" signUp={false} onSignIn={handleSignIn} />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
