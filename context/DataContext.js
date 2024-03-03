"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    clerkId: "",
    title: "",
    description: "",
    bio: "",
    type: 0,
    postedJobs: [],
    appliedJobs: [],
  });
  const [user, setUser] = useState({});
  const [sidebarShow, setSidebarShow] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("jobs");
  const [showModal, setShowModal] = useState(false);
  const [curJob, setCurJob] = useState({});
  const { userId } = useAuth();
  const [alerts, setAlerts] = useState([]);

  const addAlert = ({ message, type, time = 3000 }) => {
    let tmp = [...alerts];
    message = message.toString();
    tmp.push({
      message,
      type,
      time,
    });
    setAlerts(tmp);
  };

  let userFetched = false;
  useEffect(() => {
    setData({ ...data, clerkId: userId });
    if (!userFetched) {
      axios
        .get(`/api/users/getclerk/${userId}`)
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {});
      userFetched = true;
    }
  }, [userId]);

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
        user,
        setUser,
        addAlert,
        alerts,
        setAlerts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
