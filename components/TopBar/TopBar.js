import Image from "next/image";
import React, { useState } from "react";
import topImage from "../../assets/Header/bhalogari.0bdbffc9.png";

const TopBar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <div>
      {/* <nav class="flex items-center justify-between flex-wrap bg-stone-200 p-3 ">
        <div class="flex items-center flex-shrink-0 text-white ml-32">
          <Image width={60} height={60} src={topImage}></Image>
        </div>
      </nav> */}
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-stone-200 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div class="flex items-center flex-shrink-0 text-white ml-32">
              <Image width={60} height={60} src={topImage}></Image>
            </div>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-orange-500 "
                  href="#"
                >
                  <span className="ml-2 text-orange-500">How it works</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-orange-500 "
                  href="#"
                >
                  <span className="ml-2 text-orange-500">Pricing</span>
                </a>
              </li>
              <li className="nav-item ">
                <button className="bg-white hover:bg-orange-600 text-orange-500 hover:text-white  py-2 px-4 lg:mx-5 sm:mx-0  rounded-full ">
                  My Store
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
