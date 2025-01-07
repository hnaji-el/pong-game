import React from "react";

function StatusTag({ isOnline }: { isOnline: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`h-2 w-2 rounded-full ${
          isOnline ? "bg-online" : "bg-offline"
        }`}
      ></span>
      <span className="text-sm font-light capitalize text-secondaryText">
        {isOnline ? "online" : "offline"}
      </span>
    </div>
  );
}

export default StatusTag;
