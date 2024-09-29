import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Initialization for ES Users
import { Ripple, initTWE } from "tw-elements";

function Allproducts() {
  const [cards, setCards] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    initTWE({ Ripple });
  }, []);

  return (
    <div className="ProductSec flex flex-col">
      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 ">
        {/* container card div  */}
        <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark shadow-gray-400 shadow-sm">
          <div
            className="relative overflow-hidden bg-cover bg-no-repeat h-32 " // Adjusted height
            data-twe-ripple-init=""
            data-twe-ripple-color="light"
          >
            <img
              className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition ease-in-out duration-500 hover:cursor-pointer "
              src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
              alt=""
            />
          </div>
          <div className="p-4 text-surface dark:text-white">
            {" "}
            {/* Reduced padding */}
            <h5 className="mb-1 text-lg font-medium leading-tight">
              Card title
            </h5>{" "}
            {/* Reduced text size */}
            <p className="mb-2 text-sm">
              {" "}
              {/* Reduced text size */}
              Some quick example text to build on the card title.
            </p>
            <button
              onClick={() => navigate("/ProductPurchasedDetails")}
              type="button"
              className="inline-block rounded bg-primary px-4 py-1 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300   bg-sky-600 focus:outline-none"
              data-twe-ripple-init=""
              data-twe-ripple-color="light"
            >
              Button
            </button>
          </div>
        </div>
        {/* Repeat the above block for additional cards */}
      </div>
    </div>
  );
}

export default Allproducts;
