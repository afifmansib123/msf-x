import React from "react";
import Router from "next/router";

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import LoginForm from "../stories/pages/LoginForm";

export default function Index(props) {
  const { landingPage } = props;
  // Only for CSR
  // const queryClient = useQueryClient()
  // const query = useQuery('todos', getTodos)

  // Only force direct to certain development section
  React.useEffect(() => {
    // Router.push("/admin/dashboard");
    if (landingPage) {
      Router.push(landingPage);
    }
  });

  // TODO Show default MSF page
  return (
    <div className="m-10">
      {landingPage && <p>Landing page: {landingPage}</p>}
      <h1 className="text-2xl text-green">Merchant Storefront</h1>
      <div className="grid grid-cols-1">
        <LoginForm title="Member Signin" />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  console.log("LANDING_PAGE", process.env.LANDING_PAGE);
  return {
    props: {
      landingPage: process.env.LANDING_PAGE ? process.env.LANDING_PAGE : null,
    },
  };
}
