import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function _error() {
  // React.useEffect(() => {
  //   Router.push("/admin/dashboard");
  // });

  const { error } = useRouter().query;
  // TODO Default Error Page
  return (
    <div>
      <h1>404</h1>
      <p>{error}</p>
      <Link href="/">Back to store</Link>
    </div>
  );
}
