"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/context/DataContext";

export function UserInputForm() {
  const { data, setData } = useData();
  const [user, setUser] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    type: 1, // 1: volunteer, 2: employer
  });

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
