import React from "react";
import Router from "next/router";

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import LoginForm from "/stories/pages/LoginForm";

export default function Index(props) {
  const { landingPage } = props;

  const handleSignIn = () => {
    // TODO vertify credential
    Router.push("/admin/dashboard")
  }
  return (
    <div className="m-10">
      <h1 className="text-2xl text-green">BG Admin Panel</h1>
      <div className="grid grid-cols-1">
        <LoginForm title="Sign In" signUp={false} onSignIn={handleSignIn}/>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
