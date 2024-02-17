"use client";
import { auth } from "@/config/firebase";
import { Inter, Lilita_One, Roboto } from "next/font/google";
import Image from "next/image";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <div className="w-full  p-3 flex flex-row justify-between absolute top-0 bg-white ">
        <div className={`text-[30px] font-bold uppercase  ${lilita.className}`}>
          Task<span className="text-blue-500">Trove</span>
        </div>
        <div>
          <img
            src={user?.photoURL}
            alt="User Profile"
            className="rounded-full w-10 h-10 cursor-pointer"
            onClick={() => {
              auth.signOut();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
