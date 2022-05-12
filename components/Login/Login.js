import React from "react";
import Link from "next/link";

function Login() {
  return (
    <div className="flex  h-screen">
      {/* <h1>hdhfds</h1> */}
      <div className="m-auto bg-white p-8 border-2 border-orange-600 rounded-lg ">
        <h1 className="font-bold text-5xl text-orange-600 animate-bounce text-center">
          Bhalogari Merchant Storefront
        </h1>
        <div className="flex justify-center flex-col mt-3 ">
          <h1 className="text-3xl text-center font-bold">
            Sell Your Cars Like a Pro!
          </h1>
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
