import React from "react";
import Link from "next/link";
import Milage from "/assets/CarListPageIcons/milage.svg";
import Fuel from "/assets/CarListPageIcons/fuel.svg";
import Calendar from "/assets/CarListPageIcons/calendar.svg";
import Used from "/assets/CarListPageIcons/transmission.svg";
import taka from "/assets/CarListPageIcons/taka.fb378b29.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import carimage from "../../assets/img/listing/picture.svg";

const UploadedBikesList = ({ data }) => {
  const {
    BikesApp_bikemanufacturer: bike_manufacturer,
    BikesApp_bikeimage: images,
    BikesApp_bikemodel: model_name,
    id: bike_id,
    fixed_price,
    bike_year,
    mileage,
    date,
    transmission_type,
    BikesApp_biketype: bike_type,
    registration_year,
  } = data;

  const router = useRouter();
  const handleEdit = () => {
    router.push({
      pathname: "/msf/edit-bike-list/[bid]",
      query: { bid: bike_id },
    });
  };

  return (
    <>
      <div className="w-full mb-2  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        {images.length > 0 ? (
          <img
            className="rounded-t-lg h-36 w-full object-cover"
            src={images[0].image_url}
            alt="Landscape picture"
          />
        ) : (
          <img
            className="rounded-t-lg h-36 mx-auto object-cover"
            src={carimage.src}
            alt="Landscape picture"
          />
        )}
        <div className="px-5 py-5">
          <h6 className="mb-1 text-sm tracking-tight text-gray-600 dark:text-white font-sans ">
            {bike_manufacturer.maker_name}
          </h6>
          <h5 className="mb-1 text-xl font-bold tracking-tight text-orange-500 dark:text-white font-sans">
            {model_name.model_name}
          </h5>

          <div className="flex space-x-1 mb-1">
            <Image src={taka}></Image>
            <h5 className=" text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              {fixed_price}
            </h5>
          </div>

          <h6 className="mb-1 text-sm tracking-tight text-gray-900 dark:text-white">
            Category: <span className="font-bold">{bike_type.type_name}</span>
          </h6>
          <h6 className="mb-1 text-sm tracking-tight text-gray-900 dark:text-white">
            Model Year: {bike_year}
          </h6>
          <div className="">
            <div className="flex items-center space-x-1 ">
              <div className="flex  items-center  flex-col w-1/4">
                <Image
                  src={Milage}
                  className=" bg-gray-200 rounded-full width-1"
                />

                <p className="text-sm">{mileage}</p>
              </div>
              <div className="flex items-center flex-col w-1/4">
                <Image
                  src={Calendar}
                  className=" bg-gray-200 rounded-full width-1"
                />
                <p className="text-sm">{registration_year}</p>
              </div>
              <div className="flex  justify-center items-center flex-col w-1/4">
                <Image
                  src={Used}
                  className=" bg-gray-200 rounded-full width-1"
                />

                {transmission_type === "A" && (
                  <p className="text-sm">Automatic</p>
                )}
                {transmission_type === "M" && <p className="text-sm">Manual</p>}
                {transmission_type === "N/A" && (
                  <p className="text-sm"> N/A </p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3.5 px-5 my-2 mx-0 border-none rounded cursor-pointer"
            onClick={() => handleEdit()}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadedBikesList;
