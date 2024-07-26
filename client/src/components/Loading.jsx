import React from "react";
import { TailSpin } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#000"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
};

export default Loading;
