"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { isUserPoster } from "@/utils/helpers";
import { useData } from "@/context/DataContext";
import { useEffect, useState } from "react";

// Placeholder for fake data, replace this with actual data fetching mechanism
const fakeJob = {
  id: 1,
  title: "Software Engineer",
  description:
    "We are looking for a skilled software engineer to join our team. The ideal candidate will have a strong understanding of software development principles, excellent problem-solving skills, and a passion for creating high-quality software. They will be responsible for designing, developing, and maintaining software solutions that meet our business needs. This includes collaborating with other team members to define software requirements, writing clean and efficient code, and testing and debugging software applications. The successful candidate will also be committed to continuous learning and professional development.",
  location: "New York, NY",
  imageUrl:
    "https://vastphotos.com/files/uploads/social/good-morning-new-york.jpg", // Use dynamic URL here
  startDate: "2023-01-01",
  endDate: "2023-12-31",
  createdAt: "2022-12-01",
  updatedAt: "2023-01-02",
  neededApplicants: 5,
  requiredHours: 40,
  completed: false,
  accpetedApplications: [
    {
      user: {
        id: 2,
        firstname: "Linda",
        lastname: "Smith",
      },
      note: "I have 5 years of experience in software development.",
    },
  ],
  applications: [
    {
      user: {
        id: 1,
        firstname: "John",
        lastname: "Doe",
      },
      note: "I have 5 years of experience in software development.",
    },
  ],
  // Assuming poster details and applications will be fetched or included as needed
};

const Job = () => {
  const { jobid } = useParams();
  const { data, setShowModal, setCurJob } = useData();
  const [job, setJob] = useState({});

  const fetchJob = async (jobid) => {
    // Fetch job details using jobid
    setJob(fakeJob);
  };

  useEffect(() => {
    // Fetch job details using jobid
    fetchJob(jobid);
  }, []);

  // Formatting dates for display
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  const visitProfile = (id) => {
    window.location.replace("/users/" + id);
  };
  const accpetApplication = (id) => {};
  const rejectApplication = (id) => {};

  const confirmHours = (id) => {};

  const apply = () => {
    setCurJob(job);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="mt-32 max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden m-4">
        <Image
          src={job.imageUrl}
          alt="Job Image"
          width={500}
          height={250}
          className="w-full"
          objectFit="cover"
        />
        <div className="p-6">
          <h2 className="font-bold text-2xl mb-2 text-gray-800">{job.title}</h2>
          <div className="text-gray-700">
            <div className="space-y-2">
              <span className="block">
                <strong>Description:</strong> {job.description}
              </span>
              <span className="block">
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
              {isUserPoster(data.user) && (
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
                      {job.accpetedApplications.map((application, index) => {
                        return (
                          <tr
                            key={index}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {application.user.firstname}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {application.user.lastname}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
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
              {isUserPoster(data.user) && (
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
                      {job.applications.map((application, index) => {
                        return (
                          <tr
                            key={index}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {application.user.firstname}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {application.user.lastname}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
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
              {!isUserPoster(data.user) && (
                <span className="grid">
                  <button
                    type="button"
                    onClick={() => apply()}
                    className="w-fit text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 justify-self-end"
                  >
                    Apply
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
