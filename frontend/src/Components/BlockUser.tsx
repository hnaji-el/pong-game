import React from "react";
import { CardProfileUser } from "./Cards";
import { UnblockIcon } from "./Icons";

export default function BlockUser() {
  return (
    <section className="flex flex-col items-center gap-10  justify-center">
      <CardProfileUser />
      <div className="flex btn-profile items-center gap-3">
        <button className="w-36 p-2 rounded-md bg-unblock gap-2 flex items-center justify-center">
          <UnblockIcon edit="w-4 fill-primaryText" />
          <span className="text-primaryText text-sm">Unblock</span>
        </button>
      </div>
    </section>
  );
}
