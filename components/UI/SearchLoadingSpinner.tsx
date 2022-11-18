import React from "react";
import { TailSpin } from "react-loader-spinner";

function SearchLoadingSpinner() {
  return (
    <div className="mt-44 flex justify-center">
      <div className="">
        <TailSpin
          color="#E50914"
          width="50"
          height="50"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
}

export default SearchLoadingSpinner;
