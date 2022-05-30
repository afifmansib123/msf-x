import React from "react"
import prisma from "/PrismaConnect";

function Cars(props) { 
    const cars = props.cars;

    return (
        <p>{cars}</p>
    )
}

export async function getServerSideProps() {
    const allCars = await prisma.carsApp_car.findMany()
    return {
      props: {
        cars: allCars,
      },
    };
  }
  
export default Cars;