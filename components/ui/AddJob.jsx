"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import { MdAutoAwesome } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { autoCompleteAPI, genetatePrompt } from "@/utils/helpers";
import { useData } from "@/context/DataContext";
import axios from "axios";

const AddJob = () => {
  const [inputs, setInputs] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [address, setAddress] = useState("");
  const descriptionRef = useRef(null);
  const { data } = useData();
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setInputs({ ...inputs, file: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    inputs.location = address;
    inputs.startDate = new Date(inputs.startDate);
    inputs.endDate = new Date(inputs.endDate);
    axios
      .post("/api/jobs/new", { job: inputs, posterId: data.clerkId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(inputs, coordinates, address);
  };

  const cohereAutoComplete = async () => {
    setLoading(true);
    const prompt = genetatePrompt({
      description: inputs.description,
    });

    const response = await autoCompleteAPI(prompt);
    if (response.success === true) {
      setInputs({ ...inputs, description: response.text });
      descriptionRef.current.value = response.text;
    }
    setLoading(false);
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
              <span className="block relative">
                <textarea
                  ref={descriptionRef}
                  className="w-full h-32 p-2 border border-gray-300 rounded-md"
                  placeholder="Description (You can use the auto complete button to get a description based on a brief description)"
                  name="description"
                  onChange={onChange}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "1rem",
                    bottom: "1rem",
                    fontSize: "1.5rem",
                  }}
                >
                  <MdAutoAwesome
                    className={`cursor-pointer ${loading && "hidden"}`}
                    style
                    onClick={cohereAutoComplete}
                  />
                  <AiOutlineLoading3Quarters
                    className={`animate-spin ${!loading && "hidden"}`}
                  />
                </span>
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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
