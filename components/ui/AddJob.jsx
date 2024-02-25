"use client";
import Image from "next/image";
import { useState } from "react";
import AutoCompleteInput from "./AutoCompleteInput";

const AddJob = () => {
  const [inputs, setInputs] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [address, setAddress] = useState("");

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setInputs({ ...inputs, file: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, coordinates, address);
  };

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen">
      <div className="mt-32  p-2 max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden m-4">
        {inputs.file && (
          <Image
            src={URL.createObjectURL(inputs.file)}
            alt="Job Image"
            width={500}
            height={250}
            className="w-full max-h-80 object-cover"
            objectFit="cover"
          />
        )}
        <input
          type="file"
          name="file"
          onChange={onFileChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <form onSubmit={onSubmit} className="p-6 space-y-2">
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <div className="text-gray-700">
            <p className="space-y-2">
              <span className="block">
                <textarea
                  className="w-full h-32 p-2 border border-gray-300 rounded-md"
                  placeholder="Description"
                  name="description"
                  onChange={onChange}
                />
              </span>
              <span className="block">
                <AutoCompleteInput
                  setCoordinates={setCoordinates}
                  setAddress={setAddress}
                />
              </span>
              <span className="block flex items-center gap-2">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  name="startDate"
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
                  name="endDate"
                  id="endDate"
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
                  name="neededApplicants"
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
                  name="requiredHours"
                  type="number"
                  defaultValue={0}
                  className="p-2 border border-gray-300 rounded-md"
                  onChange={onChange}
                />
              </span>
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
