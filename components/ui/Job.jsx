"use client";
import { isUserPoster } from "@/utils/helpers";
import { useData } from "@/context/DataContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Job = ({ jobid }) => {
  const { setShowModal, setCurJob, user } = useData();
  const [job, setJob] = useState({});
  const [canApply, setCanApply] = useState(false);

  const fetchJob = async (jobid) => {
    const response = await axios
      .get(`/api/jobs/${jobid}`)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        return {};
      });
    setJob(response);
  };

  let jobFetch = false;
  useEffect(() => {
    if (!jobFetch) {
      fetchJob(jobid);
      jobFetch = true;
    }
  }, []);

  useEffect(() => {
    if (user.appliedJobs) {
      let found = user.appliedJobs.find((each) => each.jobId == jobid);
      if (found) {
        setCanApply(false);
      } else {
        setCanApply(true);
      }
    }
  }, [jobid, user]);

  // Formatting dates for display
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const visitProfile = (id) => {
    window.location.replace("/users/" + id);
  };
  const accpetApplication = async (id) => {
    await axios
      .post(`/api/application/accept`, {
        id: id,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  const rejectApplication = (id) => {};

  const confirmHours = async (id) => {
    await axios
      .post(`/api/application/confirm`, {
        id: id,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };

  const apply = () => {
    if (canApply) {
      setCurJob(job);
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="mt-32 max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden m-4">
        <img
          src={job.imageUrl}
          alt="Job Image"
          className="w-full"
          style={{ objectFit: "cover", height: "20rem" }}
        />
        <div className="p-6">
          <h2 className="font-bold text-2xl mb-2 text-gray-800">{job.title}</h2>
          <div className="text-gray-700">
            <div className="space-y-2">
              <span className="block">
                <strong>Description:</strong> {job.description}
              </span>
              <span className="block" style={{ marginTop: "1rem" }}>
                <strong>Location:</strong> {job.location}
              </span>
              <span className="block">
                <strong>Start Date:</strong> {formatDate(job.startDate)}
              </span>
              <span className="block">
                <strong>End Date:</strong> {formatDate(job.endDate)}
              </span>
              <span className="block">
                <strong>Needed Applicants:</strong> {job.neededApplicants}
              </span>
              <span className="block">
                <strong>Required Hours:</strong> {job.requiredHours}
              </span>
              <span className="block">
                <strong>Completed:</strong> {job.completed ? "Yes" : "No"}
              </span>
              {isUserPoster(user) && (
                <div style={{ margin: "2rem 0" }}>
                  <span className="block">
                    <strong>Accepted Applications:</strong>
                  </span>
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          First Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Last Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Note
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {job.applications &&
                        job.applications
                          .filter((each) => each.status == "accepted")
                          .map((application, index) => {
                            return (
                              <tr
                                key={index}
                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {application.user.firstName}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {application.user.lastName}
                                </td>
                                <td
                                  style={{
                                    maxWidth: "10rem",
                                    whiteSpace: "wrap",
                                    overflow: "scroll",
                                  }}
                                  className="whitespace-nowrap px-6 py-4"
                                >
                                  {application.note}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 flex flex-col ">
                                  <button
                                    type="button"
                                    onClick={() => confirmHours(application.id)}
                                    className="w-fit text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                  >
                                    Confirm Hours
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              )}
              {isUserPoster(user) && (
                <div style={{ margin: "3rem 0" }}>
                  <span className="block">
                    <strong>Applications:</strong>
                  </span>
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          First Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Last Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Note
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {job.applications &&
                        job.applications
                          .filter((each) => each.status == "applied")
                          .map((application, index) => {
                            return (
                              <tr
                                key={index}
                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {application.user.firstName}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {application.user.lastName}
                                </td>
                                <td
                                  style={{
                                    maxWidth: "10rem",
                                    whiteSpace: "wrap",
                                    overflow: "scroll",
                                  }}
                                  className="whitespace-nowrap px-6 py-4"
                                >
                                  {application.note}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 flex flex-col ">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      accpetApplication(application.id)
                                    }
                                    className="w-fit text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      accpetApplication(application.id)
                                    }
                                    className="w-fit text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                  >
                                    Reject
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => visitProfile(application.id)}
                                    className="w-fit text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                  >
                                    Profile
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              )}
              {!isUserPoster(user) && (
                <span className="grid">
                  <button
                    type="button"
                    onClick={() => apply()}
                    className={`w-fit text-white ${
                      canApply
                        ? "bg-blue-600 hover:bg-blue-800 cursor-pointer"
                        : "bg-blue-800 cursor-default"
                    } focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 justify-self-end`}
                  >
                    {canApply ? "Apply" : "Applied"}
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
