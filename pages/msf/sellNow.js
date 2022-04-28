import React from "react";
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
      <h1>{data.results.length}</h1>
      <div className="flex flex-wrap py-5 justify-center items-center gap-4 ">
        {data.results.map((data) => (
          <SellCar key={data.car_id} data={data}></SellCar>
        ))}
      </div>
    </div>
  );
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
