import React from "react";
import Link from "next/link";
import Image from "next/image";
import topImage from "../../assets/Header/bhalogari.0bdbffc9.png";
import sideImage from "../../assets/Header/ss.0bdbffc9.png";

function Login() {
  return (
    <div className="flex justify-right">
      <Image src={sideImage}></Image>
      <div className="flex items-right justify-right">
        <ol>
          <div
            className="box-content  p-8 border-3 ... "
            style={{ backgroundColor: "#FFFFFF", height: "650px", width: "500px" }}
          >
            <div class="flex items-center flex-shrink-0 text-white ml-52">
              <Image width={"100%"} height={"100%"} src={topImage}></Image>
            </div>

            <h3 className="text-3xl font-bold text-center mt-[40px] text-bhalogari">BHALOGARI MERCHANT STOREFRONT</h3>
            <p className="m-5 text-center">Sign in to continue to Bhalogari</p>

            <div className="flex items-center justify-center">
              <ul>
                <Link href="/msf">
                  <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 border border-orange-700 rounded">
                    Merchant Storefront{" "}
                  </button>
                </Link>

                <br></br>

                <Link href="/admin">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-8 border border-orange-700 rounded"
                    style={{ marginTop: "10px" }}
                  >
                    {" "}
                    BG Admin Panel{" "}
                  </button>
                </Link>
              </ul>
            </div>
            <p style={{ marginTop: "80px", textAlign: "center", fontSize: "14px" }}>
              © 2022 <Link href="https://bhalogari.com">Bhalogari</Link>
            </p>
          </div>
        </ol>
      </div>
    </div>
  );
}

export default Login;

// <div className="flex  h-screen">
//   <div className="m-auto bg-white  border-2 border-orange-600 rounded-lg shadow-lg ">
//     <h1 className="font-bold text-5xl text-orange-600  text-center px-8 py-5">
//       Bhalogari Merchant Storefront
//     </h1>
//     <div className="flex justify-center flex-col mt-3  ">
//       <h1 className="text-3xl text-center font-bold ">
//         Sell Your Cars Like a Pro!
//       </h1>
//       <ul className="bg-gray-200">
//         <li className="text-3xl mt-3 text-center bg-gray-200 text-orange-600 ">
//           <Link href="/msf" className="hover:text-white">
//             Merchant Storefront
//           </Link>
//         </li>
//         <li className="text-3xl mt-3 text-center bg-gray-200 text-orange-600 mb-6">
//           <Link href="/admin">BG Admin Panel</Link>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
