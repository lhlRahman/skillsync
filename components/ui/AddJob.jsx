"use client";
import { useParams } from "next/navigation";
import Image from "next/image";

const AddJob = () => {
  const { jobid } = useParams();

  const onChange = (e) => {};

  // Placeholder for fake data, replace this with actual data fetching mechanism
  const job = {
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
    // Assuming poster details and applications will be fetched or included as needed
  };

  // Formatting dates for display
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-500">
      <div className="mt-32 max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden m-4">
        <Image
          src={job.imageUrl}
          alt="Job Image"
          width={500}
          height={250}
          className="w-full"
          objectFit="cover"
        />
        <div className="p-6 space-y-2">
          <input
            type="text"
            placeholder="Title"
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <div className="text-gray-700">
            <p className="space-y-2">
              <span className="block">
                <textarea
                  className="w-full h-32 p-2 border border-gray-300 rounded-md"
                  placeholder="Description"
                  onChange={onChange}
                />
              </span>
              <span className="block">
                <input
                  type="text"
                  placeholder="Location"
                  onChange={onChange}
                  className="w-80 p-2 border border-gray-300 rounded-md"
                />
              </span>
              <span className="block flex items-center gap-2">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  placeholder="Start Date"
                  onChange={onChange}
                  className=" p-2 border border-gray-300 rounded-md"
                />
              </span>
              <span className="block flex items-center gap-4">
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  placeholder="End Date"
                  onChange={onChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </span>
              <span className="block flex items-center gap-4">
                <label htmlFor="neededApplicants">
                  <strong>Needed Applicants:</strong>
                </label>
                <input
                  id="neededApplicants"
                  type="number"
                  defaultValue={0}
                  className="p-2 border border-gray-300 rounded-md"
                  onChange={onChange}
                />
              </span>
              <span className="block flex items-center gap-4">
                <label htmlFor="requiredHours">
                  <strong>Required Hours:</strong>
                </label>
                <input
                  id="requiredHours"
                  type="number"
                  defaultValue={0}
                  className="p-2 border border-gray-300 rounded-md"
                  onChange={onChange}
                />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
