import React from "react";

interface TypeProps {
  edit?: string;
}

export default function Spinner({ edit }: TypeProps) {
  return (
    <div
      className={`loader h-16 w-16 rounded-full border-[3px] border-t-[3px] border-shape ease-linear ${edit}`}
    ></div>
  );
}
