import React from "react";

import Spinner from "../Spinner";

export default function Redirection() {
  React.useEffect(() => {
    document.title = "Pong - Redirection...";
  }, []);

  return (
    <div className="mx-3 flex h-full items-center justify-center">
      <Spinner />
    </div>
  );
}
