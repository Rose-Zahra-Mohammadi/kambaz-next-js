"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./PeopleTable";
import * as client from "../../../client";

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = useCallback(async () => {
    if (!cid) return;
    try {
      const enrolledUsers = await client.fetchUsersForCourse(cid as string);
      setUsers(enrolledUsers);
    } catch (error) {
      console.error("Failed to fetch enrolled users:", error);
      setUsers([]);
    }
  }, [cid]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
