import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function index() {
  const { data: session } = useSession();
  console.log("session: ", session);
  const router = useRouter();

  return (
    <div className="bg-white bg-[url('/login-page.jpg')] h-screen bg-center bg-cover">
      <div className="fixed top-0 bg-transparent h-20 w-screen">
        <div className="flex justify-between pt-4">
          <div className="flex space-x-2 pl-[15px]">
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
      <div className="pt-[200px] content-center max-w-[300px] mx-auto">
        <p className="text-white font-extrabold text-3xl">
          Unlimited movies, TV shows and more.
        </p>
        <p className="text-white font-semibold text-lg">
          Watch anywhere. Cancel anytime.
        </p>
      </div>
    </div>
  );
}

export default index;
