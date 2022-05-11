import React from "react";
import {getSession} from "next-auth/react"

// layout for this page
import MSF from "layouts/MSF.js";
import SellCar from "../../components/Sellcar/SellCar";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const sellNow = ({ data }) => {

  // const {maker_name,maker_country} = data.results.carmanufacturer;
  //   const carRow = data.results.map((car) => [
  //     car?.car_manufacturer?.maker_name,
  //     car?.car_id,
  //     car?.car_manufacturer?.maker_country,
  //     car?.car_year,
  //   ]);
  //   const [items, setItems] = React.useState([]);
  //   setItems(data.results);
  return (
    <div>
      {/* <h1>{data.results.length}</h1> */}
      {/* <div className="grid grid-cols-4  md:grid-cols-3  justify-center items-center rounded-lg border bg-white px-10 py-10 mt-20 "> */}
      {/* <div className="grid  sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center items-center rounded-lg border bg-white sm:p-8 md:p-1 p-2 sm:mx-32 lg:mx-40 mt-20  "> */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 justify-center items-center rounded-lg border bg-white sm:p-8 p-2 sm:mx-32 lg:mx-0 md:mx-4 mt-20 lg:space-x-1 gap-5 ">
        {data.results.map((data) => (
          <SellCar key={data.car_id} data={data}></SellCar>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const session = await getSession()
  console.log(session);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BG_API}cars/user-car-list/41/?format=json`
  );
  const data = await res.json();
  console.table(data);
  // Pass data to the page via props
  return { props: { data } };
}

sellNow.layout = MSF;

export default sellNow;
