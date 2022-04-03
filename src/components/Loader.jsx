import React from 'react'
import { MutatingDots } from "react-loader-spinner";

function Loader() {
  return (
    <MutatingDots
        wrapperStyle={{ height: "250px", alignItems: "center" }}
        color="#3333d4"
        secondaryColor="#6666d4"
        height={100}
        width={100}
        ariaLabel="loading-indicator"
    />
  )
}

export default Loader