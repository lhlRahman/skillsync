"use client";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    document.title = "SkillSync";
  }, []);
  return (
    <>
      <MacbookScroll src="https://vastphotos.com/files/uploads/social/good-morning-new-york.jpg" />
    </>
  );
}
