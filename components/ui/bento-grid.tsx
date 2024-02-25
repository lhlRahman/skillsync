import { useData } from "@/context/DataContext";
import { cn } from "@/utils/cn";
import { isUserPoster } from "@/utils/helpers";
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
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
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
  id,
  completed,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  neededApplicants?: string | React.ReactNode;
  acceptedApplicants?: string | React.ReactNode;
  id?: string | number;
  completed?: boolean;
}) => {
  const { data } = useData();

  const downloadConfirmation = () => {
    console.log("download confirmation");
  };

  const goToJob = (id: string | number) => () => {
    window.location.replace("/jobs/" + id);
  };

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      style={{ background: "#2A2A2A" }}
    >
      <div onClick={goToJob(id)} className="cursor-pointer">
        {header}
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {completed && !isUserPoster(data.user) ? (
          <button
            onClick={downloadConfirmation}
            className="relative z-10 w-fit text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 justify-self-end"
          >
            Get Volunteers Confirmation
          </button>
        ) : (
          icon || (
            <div className="font-sans font-normal text-xs text-neutral-300">
              {acceptedApplicants}/{neededApplicants} applicants
            </div>
          )
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
