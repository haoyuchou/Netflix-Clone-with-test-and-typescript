import React from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";

export interface Props {
  open: boolean;
  onClick: () => void;
}

function Menu({ open, onClick }: Props) {
  return (
    <nav
      className={`bg-[#101010] h-screen w-60 text-left p-2 absolute top-0 left-0 ${
        open ? "translate-x-0" : "translate-x-[-100%]"
      } transition ease-in-out duration-150 cursor-pointer`}
    >
      <XMarkIcon
        onClick={onClick}
        className="h-8 text-white absolute top-2 right-2"
      />
      <div className="text-white pt-16 font-bold mx-auto w-32 text-xl">
        <div className="mb-2">
          <Link href="/">Home</Link>
        </div>

        <div className="mb-2">
          <Link href="/movie">Movie</Link>
        </div>
        <div className="mb-2">
          <Link href="/tv">TV</Link>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
