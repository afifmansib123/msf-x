import React from "react";
import { useRouter } from 'next/router';

const UploadedCarsList = ({ data }) => {
  const {
    CarsApp_carmanufacturer: car_manufacturer,
    CarsApp_carimage: images,
    CarsApp_carmodel: model_name,
    id: car_id,
    fixed_price,
    car_year,
    mileage,
    CarsApp_carfuel_CarsApp_car_car_fuel_idToCarsApp_carfuel: car_fuel,
    date,
    transmission_type,
    CarsApp_cartype: car_type,
    registration_year,
  } = data;

  const router = useRouter();
  const handleEdit = () => {
    router.push({
      pathname: `/msf/edit-list/${data.id}`,
      // query: { cid: car_id },
    })
  }

  return (
    <div>
      <div className="w-full mb-2  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        {images.length > 0 ? (
          <img className="rounded-t-lg h-36 w-full object-cover" src={images[0].image_url} alt="Landscape picture" />
        ) : (
          <img className="rounded-t-lg h-36 mx-auto object-cover" src="/assets/img/listing/picture.svg" alt="Landscape picture" />
        )}
        <div className="px-5 py-5">
          <h6 className="mb-1 text-sm tracking-tight text-gray-600 dark:text-white font-sans ">
            {car_manufacturer.maker_name}
          </h6>
          <h5 className="mb-1 text-xl font-bold tracking-tight text-orange-500 dark:text-white font-sans">
            {model_name.model_name}
          </h5>

          <div className="flex space-x-1 mb-1">
            <img src="/assets/CarListPageIcons/taka.fb378b29.svg"></img>
            <h5 className=" text-sm font-bold tracking-tight text-gray-900 dark:text-white">{fixed_price}</h5>
          </div>

          <h6 className="mb-1 text-sm tracking-tight text-gray-900 dark:text-white">
            Category: <span className="font-bold">{car_type.type_name}</span>
          </h6>
          <h6 className="mb-1 text-sm tracking-tight text-gray-900 dark:text-white">Model Year: {car_year}</h6>
          <div className="">
            <div className="flex items-center space-x-1 ">
              <div className="flex  items-center  flex-col w-1/4">
                <img src="/assets/CarListPageIcons/milage.svg" className=" bg-gray-200 rounded-full width-1" />

                <p className="text-sm">{mileage}</p>
              </div>
              <div className="flex  items-center flex-col w-1/4">
                <img src="/assets/CarListPageIcons/fuel.svg" className=" bg-gray-200 rounded-full width-1" />

                <p className="text-sm">{car_fuel.fuel_type}</p>
              </div>
              <div className="flex items-center flex-col w-1/4">
                <img src="/assets/CarListPageIcons/calendar.svg" className=" bg-gray-200 rounded-full width-1" />
                <p className="text-sm">{registration_year}</p>
              </div>
              <div className="flex  justify-center items-center flex-col w-1/4">
                <img src="/assets/CarListPageIcons/transmission.svg" className=" bg-gray-200 rounded-full width-1"/>

                {transmission_type === "A" && <p className="text-sm">Automatic</p>}
                {transmission_type === "M" && <p className="text-sm">Manual</p>}
                {transmission_type === "N/A" && <p className="text-sm"> N/A </p>}
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-orange-500 text-white py-3.5 px-5 my-2 mx-0 border-none rounded cursor-pointer"
            onClick={() => handleEdit()}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadedCarsList;


