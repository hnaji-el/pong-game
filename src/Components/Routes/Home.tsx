import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";

export default function Home() {
  useEffect(() => {
    document.title = "Pong - Home";
  }, []);
  return <Navigation />;
}
