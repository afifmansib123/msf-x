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
      <div
        className="
        
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gray-200
  "
      >
        <div className="px-40 py-20 bg-white rounded-md shadow-sm">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-orange-600 text-9xl">404</h1>

            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Page not found
            </h6>

            <p className="mb-8 text-center text-gray-500 md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>

            <Link href="/">
              <a
                href="#"
                className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
              >
                Back to store
              </a>
            </Link>
          </div>
        </div>
      </div>

      <p>{error}</p>
      {/* <Link href="/">Back to store</Link> */}
    </div>
    
  );
}
