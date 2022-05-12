import React from "react";
import Link from "next/link";

function Login() {
  return (
    <div className="flex mt-44">
      <div className="m-auto">
        <h1 className="font-bold text-5xl">Bhalogari Merchant Storefront</h1>
        <div className="flex justify-center flex-col mt-3">
          <h1 className="text-3xl text-center">Sell Your Cars Like a Pro!</h1>
          <ul>
            <li className="text-3xl mt-3 text-center">
              <Link href="/msf">Merchant Storefront</Link>
            </li>
            <li className="text-3xl mt-3 text-center">
              <Link href="/admin">BG Admin Panel</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
