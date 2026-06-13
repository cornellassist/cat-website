"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Member = {
  id: number;
  name: String;
  role: String;
  year: number;
  major: String;
  college: String;
};

export function TeamsDashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);

      // switched to axios fetching from our own backend, for more room for business
      // and also for structure/organization of the website so all logic in one place
      try {
        const { data } = await axios.get("/api/members");
        console.log("data:", data);
        setMembers(data ?? []);
      } catch (error) {
        console.log("error:", error);
        setError(String(error));
      }
      setLoading(false);
    };
    fetchMembers();
  }, []);

  if (loading) {
    return <p className="p-8 text-gray-400">Loading...</p>;
  } else if (error) {
    <p className="p-8 text-red-400">Error: {error}</p>;
  }

  return (
    <div className="p-8 ml-70">
      <h1 className="mainheading mb-5">Team Members</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-red-200 uppercase text-xs">
            <tr>
              <th className="py-3">ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Year</th>
              <th>Major</th>
              <th>College</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-400 border-r border-gray-200">
                  {member.id}
                </td>
                <td className="px-4 py-3 font-medium border-r border-gray-200">
                  {member.name}
                </td>
                <td className="px-4 py-3 border-r border-gray-200">
                  <span
                    className={`text-xs font-medium px-2 py-1 border-r border-gray-200 ${
                      member.role === "TEAM_LEADS"
                        ? "bg-gray-50 text-gray-600"
                        : member.role === "OPERATIONS_LEADS" ||
                            member.role === "OPERATIONS"
                          ? "bg-blue-50 text-blue-600"
                          : member.role === "ENGINEERING_LEADS" ||
                              member.role === "ENGINEERING"
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                    }`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="px-4 py-3 border-r border-gray-200">
                  {member.year}
                </td>
                <td className="px-4 py-3 border-r border-gray-200">
                  {member.major}
                </td>
                <td className="px-4 py-3">{member.college}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
