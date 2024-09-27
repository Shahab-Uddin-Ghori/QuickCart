import React from "react";
import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div>
      <ClipLoader color="#3498db" loading={true} size={50} />
    </div>
  );
}

export default Loader;
