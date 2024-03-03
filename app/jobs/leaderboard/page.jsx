"use client";
import React, { useState, useEffect } from "react";
import { getLeaderboard } from "@/lib/api";

export default function Page() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const newUsers = await getLeaderboard();
    setUsers(newUsers);
  };

  let dataFetched = false;
  useEffect(() => {
    if (!dataFetched) {
      fetchUsers();
      dataFetched = true;
    }
  }, []);

  useEffect(() => {
    document.title = "SkillSync | Leaderboard";
  }, []);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        paddingTop: "8rem",
      }}
    >
      <div style={{ width: "40rem" }}>
        <table className="w-full text-left text-sm font-light">
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
                Hours
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr
                  key={index}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.firstName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.lastName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.hoursCompleted}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
