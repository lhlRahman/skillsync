"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/JobsJobPoster.module.scss";
import JobsTable from "@/components/ui/JobsTable";
import {
  createItemPoster,
  createItemUser,
  isUserPoster,
} from "../../../utils/helpers";
import { useData } from "@/context/DataContext";

const items = [
  {
    id: "1",
    title: "black lives matter",
    description: "I love black people",
    location: "New York, NY",
    categories: '["Social Justice", "Community"]',
    imageUrl:
      "https://vastphotos.com/files/uploads/social/good-morning-new-york.jpg",
    startDate: "2021-08-01T00:00:00.000Z",
    endDate: "2021-08-01T00:00:00.000Z",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
    acceptedApplicants: 1,
    neededApplicants: 1,
    requiredHours: 30,
    posterId: "1",
    completed: true,
    poster: "1",
    applications: [],
  },
  {
    id: "1",
    title: "black lives matter",
    description: "I love black people",
    location: "New York, NY",
    categories: '["Social Justice", "Community"]',
    imageUrl: "",
    startDate: "2021-08-01T00:00:00.000Z",
    endDate: "2021-08-01T00:00:00.000Z",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
    acceptedApplicants: 1,
    neededApplicants: 1,
    requiredHours: 30,
    posterId: "1",
    completed: false,
    poster: "1",
    applications: [],
  },
];

export default function History() {
  const [originalItems, setOriginalItems] = useState([]);
  const { data } = useData();

  const fetchJobs = async () => {
    // const response = await fetch("/api/jobs");
    // const data = await response.json();
    if (isUserPoster(data.user)) {
      setOriginalItems(items.map(createItemPoster));
    } else {
      setOriginalItems(items.map(createItemUser));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main id={styles.jobs}>
      <div className={styles.wrapper}>
        <JobsTable items={originalItems} />
      </div>
    </main>
  );
}
