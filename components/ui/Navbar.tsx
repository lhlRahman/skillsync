"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "@/utils/cn";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>

      <MenuItem setActive={setActive} active={active} item="Get Started" className="px-4 py-2 border rounded-3xl duration-300 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/signup">I am a Employer</HoveredLink>
            <HoveredLink href="/signup">I am a Voulnteer</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Products" className="px-4 py-2 border rounded-3xl duration-300 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://vastphotos.com/files/uploads/social/good-morning-new-york.jpg"
              description="Prepare for tech interviews like never before."
            />
          </div>
        </MenuItem>

        
      </Menu>
    </div>
  );
}