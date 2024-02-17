"use client";
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "@/config/firebase";
import Image from "next/image";

import backgrondImage from "../../../public/Loginillustration.png";
import { Lilita_One } from "next/font/google";

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: ["400"],
});

const Login = () => {
  const signUser = () => {
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  return (
    <div className="h-screen flex flex-row items-center justify-center p-4 lg:p-0">
      <div className="flex-1 flex flex-col h-full ">
        <div
          className={`absolute top-8 left-18 lg:top-20 lg:left-28 text-[33px] font-bold uppercase  ${lilita.className}`}
        >
          Task<span className="text-blue-500">Trove</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <h1 className="text-[33.14px] font-medium uppercase">Login</h1>
          <p className="lg:w-[516px] text-justify text-[18px]">
            Simplify your daily routine with our intuitive todo app. Efficiently
            manage tasks, mark important ones as favorites with a single tap,
            and utilize our powerful search functionality to quickly locate
            specific tasks
          </p>
          <div
            className="bg-[#597EF7] rounded-md p-2 px-3 flex flex-row items-center justify-between gap-4 cursor-pointer"
            onClick={signUser}
          >
            <div className="bg-white p-2 rounded-md">
              <FcGoogle className="text-[25px]" />
            </div>
            <p className="text-white font-medium">Sign in using Google</p>
          </div>
        </div>
      </div>
      <div className="flex-1 image-container h-screen hidden lg:block select-none">
        <Image
          src={backgrondImage}
          width={2000}
          height={2000}
          className="w-full h-full object-fill select-none"
          alt="Background Image"
        />
      </div>
    </div>
  );
};

export default Login;
