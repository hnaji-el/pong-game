import { VisuallyHidden } from "@chakra-ui/react";
import React from "react";

function Spinner({ size = 64 }: { size?: number }) {
  return (
    <>
      <div
        className={`loader rounded-full border-[3px] border-t-[3px] border-shape ease-linear`}
        style={{ width: size, height: size }}
      ></div>
      <VisuallyHidden>Loading, please wait...</VisuallyHidden>
    </>
  );
}

export default Spinner;
