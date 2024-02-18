"use client";
import { auth } from "@/config/firebase";
import { Inter, Lilita_One, Roboto } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  const [user] = useAuthState(auth);

  const [isProfileDropdown, setIsProfileDropdown] = useState(false);

  return (
    <>
      <div className="w-full  p-3 flex flex-row justify-between absolute top-0 bg-white ">
        <div className={`text-[30px] font-bold uppercase  ${lilita.className}`}>
          Do<span className="text-blue-500">Quirk</span>
        </div>
        <div className="relative">
          <img
            src={user?.photoURL}
            alt="User Profile"
            className="rounded-full w-10 h-10 cursor-pointer"
            onClick={() => {
              // auth.signOut();
              setIsProfileDropdown(!isProfileDropdown);
            }}
          />
          {isProfileDropdown && (
            <div className="w-32 h-auto   absolute top-12 lg:-left-52 -left-20 rounded-md shadow-xl border-2 border-gray-200 p-1 lg:w-64 bg-white">
              <div
                className="w-full text-center p-2 hover:bg-slate-100 rounded-md text-lg cursor-pointer bg-white"
                onClick={() => {
                  auth.signOut();
                  // setIsProfileDropdown(!isProfileDropdown);
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
