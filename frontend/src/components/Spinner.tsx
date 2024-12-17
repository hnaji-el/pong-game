import React from "react";

type PropsType = {
  width?: number;
  height?: number;
};

function Spinner({ width = 16, height = 16 }: PropsType) {
  return (
    <div
      className={`loader h-${height} w-${width} rounded-full border-[3px] border-t-[3px] border-shape ease-linear`}
    ></div>
  );
}

export default Spinner;
