"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/context/DataContext";
import { createWorker } from 'tesseract.js';
import { FaFileUpload } from "react-icons/fa";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/FirebaseConfig";
import { v4 as uuidv4 } from 'uuid';
import ConvertAPI from 'convertapi';


export function UserInputForm() {
  const { data, setData } = useData();
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [user, setUser] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    type: 1, // 1: volunteer, 2: employe
  });

  const convertapi = new ConvertAPI('ovk3w0EEUfoqlCtK');

  // Function to handle setting user type
  const handleUserTypeChange = (type) => {
    setUser((prevState) => ({
      ...prevState,
      type: type,
    }));
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    user.clerkId = data.clerkId;

    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Do we need data for something???
      const newData = await response.json();
      console.log(newData.data);
      setData({ ...data, user: newData.data });
      // window.location.replace("/jobs");
    } catch (error) {
      console.error("Error:", error);
    }
  };


const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const storageRef = ref(storage, `uploads/${uuidv4()}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('File uploaded successfully');
      getDownloadURL(snapshot.ref).then((url) => {
        console.log('File available at', url);
        setPdfUrl(url);
      }).then(() => {
        
      });
    });
  };

  async function orc() {
    const worker = await createWorker('eng');
      const ret = await worker.recognize(pdfUrl);
      console.log(ret.data.text);
      await worker.terminate();
  }





  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
        Who Are You?
      </h2>
      <div className="flex justify-center gap-4 mb-6">
        <Button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          onClick={() => handleUserTypeChange(2)}
        >
          Employer
        </Button>
        <Button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          onClick={() => handleUserTypeChange(1)}
        >
          Volunteer
        </Button>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="text-sm font-medium text-gray-700 block mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <Input
              className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
              id="username"
              name="username"
              placeholder="Your username"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="text-sm font-medium text-gray-700 block mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
              id="email"
              name="email"
              placeholder="example@domain.com"
              type="email"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="text-sm font-medium text-gray-700 block mb-2"
              htmlFor="first-name"
            >
              First Name
            </label>
            <Input
              className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
              id="first-name"
              name="firstName"
              placeholder="Your first name"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="text-sm font-medium text-gray-700 block mb-2"
              htmlFor="last-name"
            >
              Last Name
            </label>
            <Input
              className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
              id="last-name"
              name="lastName"
              placeholder="Your last name"
              onChange={handleInputChange}
            />
          </div>
        </div>
        {user.type === 1 && (
          <div>
            <label
              className="text-sm font-medium text-gray-700 block mb-2"
              htmlFor="bio"
            >
              Bio
            </label>
            <Textarea
              className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
              id="bio"
              name="bio"
              placeholder="Write about some activities and experiences you enjoy doing or have completed. Explain what you liked about each and what aspects you have excelled at."
              onChange={handleInputChange}
            />

<label htmlFor="dropzone-file" className="block font-medium leading-6 text-purple-900 text-right">
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-purple-900/25 px-6 py-10">
            <div className="text-center">
              <FaFileUpload className="mx-auto h-12 w-12 text-purple-600 mb-2" />
              <p className="mb-2 text-sm text-black">
                <span className="relative cursor-pointer rounded-md font-semibold text-purple-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 hover:text-purple-500">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-purple-600">
                PDF up to 10MD
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
        </label>
          </div>
          

        )}
        <div className="text-center">
          <Button
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
