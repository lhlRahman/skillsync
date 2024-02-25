'use client'
import {useEffect, useState } from 'react';
import{ getUserById } from '@/lib/api';
import { useParams } from 'next/navigation';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Page = () => {
    const [user, setUser] = useState({});
    const { userid } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
          const res = await getUserById(userid);
          console.log(res.data);
          setUser(res.data);
        setLoading(false);
        }
      
        fetchData();
      }, []); // add userid as a dependency if it can change over time

  const bio = "Habib Rahman is a seasoned software engineer with over 10 years of experience in the tech industry. He specializes in full-stack development, with a particular focus on React and Node.js. Habib is passionate about creating efficient, scalable, and user-friendly applications. In his free time, he enjoys hiking, reading, and exploring new technologies.";

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-500">
      <div className="mt-32 max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden m-4">
        <div className="p-6">
          <div className="text-gray-700 flex flex-col">
            <h1 className=" text-center text-4xl pb-2 border border-white border-b-black">Hi I am Habib Rahman!</h1>
            <p className="text-lg pt-2"><strong>Bio:</strong>
              {loading ? (
                <div className="place-content-center">
                  <AiOutlineLoading3Quarters className="animate-spin h-8 w-8" />
                </div>
              ) : (
                user.bio
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;