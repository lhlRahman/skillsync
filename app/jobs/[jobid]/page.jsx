'use client';
import { useParams } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const { jobid } = useParams();

  // Placeholder for fake data, replace this with actual data fetching mechanism
  const job = {
    id: 1,
    title: "Software Engineer",
    description: "We are looking for a skilled software engineer to join our team. The ideal candidate will have a strong understanding of software development principles, excellent problem-solving skills, and a passion for creating high-quality software. They will be responsible for designing, developing, and maintaining software solutions that meet our business needs. This includes collaborating with other team members to define software requirements, writing clean and efficient code, and testing and debugging software applications. The successful candidate will also be committed to continuous learning and professional development.",
    location: "New York, NY",
    imageUrl: "https://vastphotos.com/files/uploads/social/good-morning-new-york.jpg", // Use dynamic URL here
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
        <Image src={job.imageUrl} alt="Job Image" width={500} height={250} className="w-full" objectFit="cover" />
        <div className="p-6">
          <h2 className="font-bold text-2xl mb-2 text-gray-800">{job.title}</h2>
          <div className="text-gray-700">
            <p className="space-y-2">
              <span className="block"><strong>Description:</strong> {job.description}</span>
              <span className="block"><strong>Location:</strong> {job.location}</span>
              <span className="block"><strong>Start Date:</strong> {formatDate(job.startDate)}</span>
              <span className="block"><strong>End Date:</strong> {formatDate(job.endDate)}</span>
              <span className="block"><strong>Needed Applicants:</strong> {job.neededApplicants}</span>
              <span className="block"><strong>Required Hours:</strong> {job.requiredHours}</span>
              <span className="block"><strong>Completed:</strong> {job.completed ? "Yes" : "No"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;