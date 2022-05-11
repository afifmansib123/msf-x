import React from "react";
// layout for this page
import MSF from "layouts/MSF.js";
import SellCar from "../../components/Sellcar/SellCar";
// import { useEffect, useState } from "react";

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
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetch(`https://car-app.vercel.app/api/cars/${searchKey}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setItems(data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [searchKey]);
  // const id = localStorage.getItem("id");
  return (
    <div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 justify-center items-center rounded-lg border bg-white sm:p-8 p-2 sm:mx-32 lg:mx-0 md:mx-4 mt-20 lg:space-x-1 gap-5 ">
        {data.results.map((data) => (
          <SellCar key={data.car_id} data={data}></SellCar>
        ))}
      </div>
    </div>
  );
  SS;
};
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://backend.bhalogari.com/api/cars/user-car-list/22/?format=json`
  );
  const data = await res.json();
  console.table(data);
  // Pass data to the page via props
  return { props: { data } };
}

sellNow.layout = MSF;

export default sellNow;
