import { cn } from "@/utils/cn";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  neededApplicants,
  acceptedApplicants,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  neededApplicants?: string | React.ReactNode;
  acceptedApplicants?: string | React.ReactNode;
}) => {
  console.log(neededApplicants, acceptedApplicants);
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      style={{ background: "#2A2A2A" }}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon || (
          <div className="font-sans font-normal text-xs text-neutral-300">
            {acceptedApplicants}/{neededApplicants} applicants
          </div>
        )}
        <div className="font-sans font-bold text-neutral-300 text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-xs text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
