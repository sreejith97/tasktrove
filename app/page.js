"use client";
import Image from "next/image";
import Login from "./(components)/login/page";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import LoadingAnimation from "./(components)/common/LoadingAnimation";
import { useEffect, useState } from "react";
import Dashboard from "./(components)/dashboard/page";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {loading || !showContent ? (
        <LoadingAnimation />
      ) : user ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </main>
  );
}
