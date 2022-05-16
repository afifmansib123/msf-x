import React from "react"
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import Admin from "layouts/Admin.js";

const prisma = new PrismaClient();

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