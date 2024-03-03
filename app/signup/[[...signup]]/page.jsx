// "use client";
import { SignUp } from "@clerk/nextjs";
// import { useEffect } from "react";

export default function Page() {
  // useEffect(() => {
  //   document.title = "SkillSync | Sign up";
  // }, []);
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <SignUp />
    </div>
  );
}
