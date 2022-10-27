import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Bars3Icon } from "@heroicons/react/24/solid";

function Header() {
  const { data: session } = useSession();
  const [changeNavColor, setChangeNavColor] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        setChangeNavColor(window.pageYOffset > 250);
      });
    }
  }, [changeNavColor]);

  const backgroundColor = changeNavColor ? "black" : "transparent";
  return (
    <div
      className="fixed top-0 bg-transparent h-20 w-screen"
      style={{ backgroundColor }}
    >
      <div className="flex justify-between pt-4">
        <div className="flex space-x-2 pl-[15px]">
          <Bars3Icon className="text-white h-8" />
          <img
            className="h-8 pt-2"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
          />
        </div>

        <button
          onClick={() => {
            if (session) {
              signOut();
            } else {
              signIn("facebook", { callbackUrl: "/" });
            }
          }}
          className="bg-red-600 text-white font-semibold mr-[15px] px-4 py-1"
        >
          {session ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default Header;
