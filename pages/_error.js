import React from "react";
import {useRouter} from "next/router";

export default function _error() {
  // React.useEffect(() => {
  //   Router.push("/admin/dashboard");
  // });

  const { error } = useRouter().query;
  // TODO Default Error Page
  return (
    <div>
      <h1>Error</h1>
      <p>{error}</p>
    </div>
  );
}
