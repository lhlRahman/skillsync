"use client"
import { createContext, useContext, useState } from 'react';

const TripDataContext = createContext();

// TODO: need to reset trip data context between trip creations
export const TripDataProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    clerkId: "",
    title: "",
    description: "",
    type: 0,
    postedJobs: [], // For employers: Jobs they've posted
    appliedJobs: []
  });

  return (
    <TripDataContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripDataContext.Provider>
  );
};

export const useTripData = () => useContext(TripDataContext);
