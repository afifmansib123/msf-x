import React from "react";
import Link from "next/link";

function Login() {
  return (
    <div className="flex  h-screen">
      <div className="m-auto bg-white  border-2 border-orange-600 rounded-lg shadow-lg ">
        <h1 className="font-bold text-5xl text-orange-600  text-center px-8 py-5">
          Bhalogari Merchant Storefront
        </h1>
        <div className="flex justify-center flex-col mt-3  ">
          <h1 className="text-3xl text-center font-bold ">
            Sell Your Cars Like a Pro!
          </h1>
          <ul className="bg-gray-200">
            <li className="text-3xl mt-3 text-center bg-gray-200 text-orange-600 ">
              <Link href="/msf" className="hover:text-white">
                Merchant Storefront
              </Link>
            </li>
            <li className="text-3xl mt-3 text-center bg-gray-200 text-orange-600 mb-5">
              <Link href="/admin">BG Admin Panel</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
