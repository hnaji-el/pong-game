import React from "react";

function RoleTag({ role }: { role: string }) {
  if (role === "MEMBER") return null;

  let styles = "";
  if (role === "OWNER") styles = "bg-[#FFD700] text-[#4B4B4B]";
  else if (role === "ADMIN") styles = "bg-[#007BFF] text-[#FFFFFF]";
  else if (role === "BLOCKED") styles = "bg-[#FF0000] text-[#FFFFFF]";

  return (
    <span
      className={`flex w-16 items-center justify-center rounded-sm text-xs capitalize ${styles}`}
    >
      {role}
    </span>
  );
}

export default RoleTag;
