import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Menu from "../Hamburger Menu/Menu/Menu";
import SearchModal from "../Modal/SearchModal";

export interface Props {
  title: string;
}

function Header({ title }: Props) {
  const { data: session } = useSession();
  const [changeNavColor, setChangeNavColor] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchModalIsOpen, setSearchModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        setChangeNavColor(window.pageYOffset > 50);
      });
    }
  }, [changeNavColor]);

  const backgroundColor = changeNavColor ? "black" : "transparent";

  if (searchModalIsOpen) {
    return (
      <SearchModal
        onClose={() => {
          setSearchModal((prev) => false);
        }}
      />
    );
  } else {
    return (
      <div
        className="fixed top-0 bg-transparent h-20 w-screen z-20"
        style={{ backgroundColor }}
      >
        <Menu
          open={menuIsOpen}
          onClick={() => {
            setMenuIsOpen((cur) => !cur);
          }}
        />
        <div className="flex justify-between pt-4 items-center">
          <div className="flex space-x-2 pl-[15px] max-h-8">
            <Bars3Icon
              className="text-white h-8 cursor-pointer"
              onClick={() => {
                setMenuIsOpen((cur) => !cur);
              }}
              title="Bars3Icon"
            />
            {title === "Home" ? (
              <img
                className="h-8 pt-2"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
                alt="Netflix"
              />
            ) : (
              <h3 className="text-white h-8 text-3xl font-bold">{title}</h3>
            )}
          </div>
          <div className="flex space-x-3 pr-[20px] max-h-8">
            <MagnifyingGlassIcon
              className="text-white h-8 cursor-pointer"
              onClick={() => {
                setSearchModal((prev) => true);
              }}
            />
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
      </div>
    );
  }
}

export default Header;
