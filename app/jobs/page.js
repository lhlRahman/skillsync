"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/JobsJobPoster.module.scss";
import JobsTable from "@/components/ui/JobsTable";
import {
  CompletedIcon,
  OnGoingIcon,
  createItemPoster,
  createItemUser,
  isUserPoster,
} from "../../utils/helpers";
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

export default function Jobs() {
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState([]);
  const { data } = useData();

  const addFilter = (filter) => {
    setFilters([...filters, filter]);
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

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

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredItems(originalItems);
      return;
    }
    setFilteredItems(
      originalItems.filter(
        (item) =>
          (filters.includes("completed") && item.completed) ||
          (filters.includes("ongoing") && !item.completed)
      )
    );
  }, [filters, originalItems]);

  return (
    <main id={styles.jobs}>
      <div className={styles.wrapper}>
        <div
          className={styles.filters}
          style={{ display: isUserPoster(data.user) ? "flex" : "none" }}
        >
          <div
            className={`${styles.filter} ${
              filters.includes("completed") && styles.active
            }`}
            onClick={() => {
              if (filters.includes("completed")) {
                removeFilter("completed");
              } else {
                addFilter("completed");
              }
            }}
          >
            <CompletedIcon />
            <div className={styles.title}>Completed</div>
          </div>
          <div
            className={`${styles.filter} ${
              filters.includes("ongoing") && styles.active
            }`}
            onClick={() => {
              if (filters.includes("ongoing")) {
                removeFilter("ongoing");
              } else {
                addFilter("ongoing");
              }
            }}
          >
            <OnGoingIcon />
            <div className={styles.title}>Ongoing</div>
          </div>
        </div>
        <JobsTable items={filteredItems} />
      </div>
    </main>
  );
}