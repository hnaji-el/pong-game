import React, { useEffect } from "react";
import Spinner from "../Spinner";

export default function Redirection() {
  useEffect(() => {
    document.title = "Pong - Redirection...";
  }, []);
  return (
    <div className="mx-3 flex justify-center items-center h-full">
      <Spinner />
    </div>
  );
}
