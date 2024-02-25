"use client";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    clerkId: "",
    title: "",
    description: "",
    type: 0,
    postedJobs: [],
    appliedJobs: [],
    user: {
      type: 2,
      bio: "First year computer science student",
    },
  });
  const [sidebarShow, setSidebarShow] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("jobs");
  const [showModal, setShowModal] = useState(false);
  const [curJob, setCurJob] = useState({});

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        setSidebarShow,
        sidebarShow,
        activeSidebar,
        setActiveSidebar,
        showModal,
        setShowModal,
        curJob,
        setCurJob,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
