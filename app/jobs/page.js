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
  rerank,
} from "../../utils/helpers";
import { useData } from "@/context/DataContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
export const dynamic = 'force-dynamic';
const { signal } = new AbortController()
export default function Jobs() {
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState([]);
  const { user, addAlert } = useData();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const onToggle = (e) => {
    setToggle(e.target.checked);
    if (e.target.checked) {
      sortBasedOnRerankReversed();
    } else {
      sortBasedOnRerank();
    }
  };

  const addFilter = (filter) => {
    setFilters([...filters, filter]);
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  // const fetchJobs = async () => {
  //   if (isUserPoster(user)) {
  //     const response = await axios
  //       .post("/api/jobs/getAllJobsPosted", { id: user.id })
  //       .then((res) => {
  //         if (res.data.status != 201) {
  //           addAlert({
  //             message:
  //               "There was an error fetching jobs. Please reload the page.",
  //             type: "error",
  //           });
  //           return [];
  //         }
  //         return res.data.data;
  //       })
  //       .catch((err) => {
  //         return [];
  //       });
  //     setOriginalItems(response.map(createItemPoster));
  //   } else {
  //     const response = await axios
  //       .get("/api/jobs")
  //       .then((res) => {
  //         if (res.data.status != 201) {
  //           addAlert({
  //             message:
  //               "There was an error fetching jobs. Please reload the page.",
  //             type: "error",
  //           });
  //           return [];
  //         }
  //         let appliedJobsIds = user.appliedJobs.map(
  //           (application) => application.jobId
  //         );
  //         console.log(appliedJobsIds);
  //         let result = res.data.data.filter(
  //           (job) => !appliedJobsIds.includes(job.id)
  //         );
  //         return result;
  //       })
  //       .catch((err) => {
  //         return [];
  //       });
  //     setOriginalItems(response.map(createItemPoster));
  //   }
  // };

  const fetchJobs = async () => {
    try {
      if (isUserPoster(user)) {
        const response = await fetch("/api/jobs/getAllJobsPosted", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: user.id })
        });
  
        const data = await response.json();
  
        if (data.status != 201) {
          addAlert({
            message: "There was an error fetching jobs. Please reload the page.",
            type: "error",
          });
          setOriginalItems([]);
        } else {
          setOriginalItems(data.data.map(createItemPoster));
        }
      } else {
        const response = await fetch("/api/jobs", { signal });
        const data = await response.json();
  
        if (data.status != 201) {
          addAlert({
            message: "There was an error fetching jobs. Please reload the page.",
            type: "error",
          });
          setOriginalItems([]);
        } else {
          let appliedJobsIds = user.appliedJobs.map((application) => application.jobId);
          let result = data.data.filter((job) => !appliedJobsIds.includes(job.id));
          setOriginalItems(result.map(createItemPoster));
        }
      }
    } catch (err) {
      setOriginalItems([]);
    }
  };


  const sortBasedOnRerank = async () => {
    if (isUserPoster(user)) return;
    setLoading(true);
    const response = await rerank(
      originalItems.map((each) => each.description),
      user.bio
    );
    if (response.success === false) {
      setLoading(false);
      return;
    }
    let copy = [...originalItems];

    copy.forEach((obj, idx) => {
      obj["newSortIndex"] = response.results[idx].index;
    });

    copy = copy.sort((a, b) => a.newSortIndex - b.newSortIndex);

    copy.forEach((item) => delete item.newSortIndex);

    setFilteredItems(copy);
    setLoading(false);
  };

  const sortBasedOnRerankReversed = async () => {
    if (isUserPoster(user)) return;
    setLoading(true);
    const response = await rerank(
      originalItems.map((each) => each.description),
      user.bio
    );
    if (response.success === false) {
      setLoading(false);
      return;
    }
    let copy = [...originalItems];

    copy.forEach((obj, idx) => {
      obj["newSortIndex"] = response.results[idx].index;
    });

    copy = copy.sort((a, b) => b.newSortIndex - a.newSortIndex);

    copy.forEach((item) => delete item.newSortIndex);

    setFilteredItems(copy);
    setLoading(false);
  };

  useEffect(() => {
    if (originalItems.length > 0 && user.bio !== "") {
      sortBasedOnRerank();
    }
  }, [originalItems, user]);

  let jobsFetched = false;
  useEffect(() => {
    document.title = "SkillSync | Jobs";
    if (!jobsFetched && user.type && user.type !== 0) {
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
      {!isUserPoster(user) && (
        <div className={styles.toggleWrapper}>
          <label className="inline-flex cursor-pointer" style={{ gap: "1rem" }}>
            <input
              type="checkbox"
              value=""
              onChange={onToggle}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

            <span
              className={`${styles.information} flex items-center text-xs italic font-light text-gray-900 dark:text-gray-300`}
            >
              <IoMdInformationCircleOutline />
              {toggle ? (
                <span>Strengthen current skills</span>
              ) : (
                <span>Attain new skills</span>
              )}
            </span>
          </label>
        </div>
      )}

      <div>
        {loading && (
          <div className="flex items-center gap-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-green-200 rounded">
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
            <p>Personalizing your job feed based on your bio...</p>
          </div>
        )}

        {!loading && (
          <div className={styles.wrapper}>
            <div
              className={styles.filters}
              style={{ display: isUserPoster(user) ? "flex" : "none" }}
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
            {filteredItems.length === 0 && (
              <div className="mt-5 text-center">No jobs found</div>
            )}
            <JobsTable items={filteredItems} />
          </div>
        )}
      </div>
    </main>
  );
}
