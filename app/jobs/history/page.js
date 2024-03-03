"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/JobsJobPoster.module.scss";
import JobsTable from "@/components/ui/JobsTable";
import {
  CompletedIcon,
  OnGoingIcon,
  createItemPoster,
  createItemUser,
  isUserPoster,
} from "../../../utils/helpers";
import { useData } from "@/context/DataContext";
import axios from "axios";

export default function History() {
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState([]);
  const { user, addAlert } = useData();

  const addFilter = (filter) => {
    setFilters([...filters, filter]);
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  useEffect(() => {
    document.title = "SkillSync | Jobs History";
  }, []);

  const fetchJobs = async () => {
    if (isUserPoster(user)) {
      const response = await axios
        .post("/api/jobs/getAllJobsPosted", { id: user.id })
        .then((res) => {
          if (res.data.status != 201) {
            addAlert({
              message:
                "There was an error fetching records. Please reload the page.",
              type: "error",
            });
            return [];
          }
          return res.data.data;
        })
        .catch((err) => {
          return [];
        });
      setOriginalItems(response.map(createItemPoster));
    } else {
      const response = await axios
        .post("/api/jobs/getAllAppliedTo", { id: user.id })
        .then((res) => {
          if (res.data.status != 201) {
            addAlert({
              message:
                "There was an error fetching records. Please reload the page.",
              type: "error",
            });
            return [];
          }
          return res.data.data;
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
      setOriginalItems(response.map(createItemUser));
    }
  };

  let jobsFetched = false;
  useEffect(() => {
    if (!jobsFetched && user.id) {
      fetchJobs();
      jobsFetched = true;
    }
  }, [user]);

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
        <div className={styles.filters}>
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
        {filteredItems.length === 0 && (
          <div className="mt-5 text-center">No records found</div>
        )}
        <JobsTable items={filteredItems} />
      </div>
    </main>
  );
}
