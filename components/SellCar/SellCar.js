import React from "react";
import Link from "next/link";
import Milage from "../../assets/carListPageIcons/milage.svg";
import Fuel from "../../assets/carListPageIcons/fuel.svg";
import Calendar from "../../assets/carListPageIcons/calendar.svg";
import Used from "../../assets/carListPageIcons/transmission.svg";

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
  } = data;
  return (
    <div>
      <Link key={car_id} href="h" passHref>
        <div className="max-w-sm min-h-full  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="rounded-t-lg h-64 w-full"
              src={images?.image_url}
              alt="Landscape picture"
            />
          </a>
          <div className="p-5">
            <h6 className="mb-2  text-xl tracking-tight text-gray-600 dark:text-white font-sans ">
              {car_manufacturer.maker_name}
            </h6>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-orange-500 dark:text-white font-sans">
              {model_name.model_name}
            </h5>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {fixed_price}
            </h5>
            <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Model Year: {car_year}
            </h3>

            <div className="flex items-center space-x-16 p-10">
              <div className="flex  items-center  flex-col w-6">
                <img src={Milage} className="w-10 bg-gray-200 rounded-full" />

                <h1>{mileage}</h1>
              </div>
              <div className="flex  items-center flex-col w-6">
                <img src={Fuel} className="w-10 bg-gray-200 rounded-full" />

                <h1>{car_fuel.fuel_type}</h1>
              </div>
              <div className="flex items-center flex-col w-6">
                <img src={Calendar} className="w-10 bg-gray-200 rounded-full" />
                <h1>{car_year}</h1>
              </div>
              <div className="flex  justify-center items-center flex-col w-6">
                <img src={Used} className="w-10 bg-gray-200 rounded-full" />

                {transmission_type === "A" && <h1>Automatic</h1>}
                {transmission_type === "M" && <h1>Manual</h1>}
              </div>
            </div>
            <button
              type="submit"
              class="w-full bg-orange-500 text-white py-3.5 px-5 my-2 mx-0 border-none rounded cursor-pointer hover:bg-orange-600"
            >
              Edit
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SellCar;
