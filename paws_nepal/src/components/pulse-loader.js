import React from "react";
import { PulseLoader } from "react-spinners";

const ThePulseLoader = () => {
  return (
    <PulseLoader
      color={"white"}
      //   cssOverride={override}
      size={12}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default ThePulseLoader;
