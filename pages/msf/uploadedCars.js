// layout for this page
import MSF from "layouts/MSF.js";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
// react plugin for creating charts
import makeStyles from "@mui/styles/makeStyles";
import SellCar from "../../components/Sellcar/SellCar";

const uploadedCars = ({ data }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
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
  const res = await fetch(
    `https://backend.bhalogari.com/api/cars/user-car-list/22/?format=json`
  );
  const data = await res.json();
  console.table(data);
  // Pass data to the page via props
  return { props: { data } };
}
uploadedCars.layout = MSF;
export default uploadedCars;
