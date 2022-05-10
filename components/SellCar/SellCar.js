import React from "react";
import Link from "next/link";
import Milage from "../../assets/carListPageIcons/milage.svg";
import Fuel from "../../assets/carListPageIcons/fuel.svg";
import Calendar from "../../assets/carListPageIcons/calendar.svg";
import Used from "../../assets/carListPageIcons/transmission.svg";
import taka from "../../assets/carListPageIcons/taka.fb378b29.svg";

const SellCar = ({ data }) => {
  const {
    car_manufacturer,
    images,
    model_name,
    car_id,
    fixed_price,
    car_year,
    mileage,
    car_fuel,
    date,
    transmission_type,
    car_type,
  } = data;
  return (
    <div>
      <div className="w-full mb-2  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img
          className="rounded-t-lg h-36 w-full"
          src={images?.image_url}
          alt="Landscape picture"
        />
        <div className="p-5">
          <h6 className="mb-1 text-sm tracking-tight text-gray-600 dark:text-white font-sans ">
            {car_manufacturer.maker_name}
          </h6>
          <h5 className="mb-1 text-xl font-bold tracking-tight text-orange-500 dark:text-white font-sans">
            {model_name.model_name}
          </h5>
          <div className="flex space-x-1 mb-1">
            <img src={taka}></img>
            <h5 className=" text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              {fixed_price}
            </h5>
          </div>

          <h6 className="mb-1 text-sm tracking-tight text-gray-900 dark:text-white">
            Category: <span className="font-bold">{car_type.type_name}</span>
          </h6>
          <h6 className="mb-1 text-sm tracking-tight text-gray-900 dark:text-white">
            Model Year: {car_year}
          </h6>

          <div className="flex items-center space-x-4 ">
            <div className="flex  items-center  flex-col w-1/4">
              <img src={Milage} className=" bg-gray-200 rounded-full width-1" />

              <p className="text-sm">{mileage}</p>
            </div>
            <div className="flex  items-center flex-col w-1/4">
              <img src={Fuel} className=" bg-gray-200 rounded-full width-1" />

              <p className="text-sm">{car_fuel.fuel_type}</p>
            </div>
            <div className="flex items-center flex-col w-1/4">
              <img
                src={Calendar}
                className=" bg-gray-200 rounded-full width-1"
              />
              <p className="text-sm">{car_year}</p>
            </div>
            <div className="flex  justify-center items-center flex-col w-1/4">
              <img src={Used} className=" bg-gray-200 rounded-full width-1" />

              {transmission_type === "A" && (
                <p className="text-sm">Automatic</p>
              )}
              {transmission_type === "M" && <p className="text-sm">Manual</p>}
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-orange-500 text-white py-3.5 px-5 my-2 mx-0 border-none rounded cursor-pointer"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellCar;
