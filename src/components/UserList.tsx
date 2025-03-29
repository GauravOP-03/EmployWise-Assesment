import { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import UserCard from "./UserCard";
import Pagination from "./Pagination";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Toaster } from "./ui/sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types";
import { fetchUser } from "@/api";

const UsersList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("id");
  const { users, setUsers, setTotalPages, page, deletedUsers, editedUsers } =
    useUser();
  const [loading, setLoading] = useState(true);

  // Fetch Users
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      toast.error("Please login first", {
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });

      return;
    }

    setLoading(true);
    fetchUser(page)
      .then((res) => {
        let fetchedUsers = res.data.data;

        // Remove deleted users
        fetchedUsers = fetchedUsers.filter(
          (user: User) => !deletedUsers.includes(user.id)
        );

        // Apply edited users from state
        fetchedUsers = fetchedUsers.map((user: User) =>
          editedUsers[user.id] ? { ...user, ...editedUsers[user.id] } : user
        );

        setUsers(fetchedUsers);
        setTotalPages(res.data.total_pages);
      })
      .catch((error) => console.error("Error fetching users:", error))
      .finally(() => setLoading(false));
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("deletedUsers");
    localStorage.removeItem("editedUsers");
    navigate("/login");
    toast.success("Logout Successfully");
  };

  // Filter and sort users
  const filteredUsers: User[] = users
    .filter((user: User) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort((a: User, b: User) =>
      sortOption === "name"
        ? a.first_name.localeCompare(b.first_name)
        : a.id - b.id
    );

  return (
    <div className="max-w-5xl mx-auto min-h-screen p-8 space-y-8">
      <Toaster />

      <Card className="p-6 shadow-lg rounded-2xl text-center w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Users List</CardTitle>
        </CardHeader>
      </Card>

      {/* Search & Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-72 "
        />
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-40 border border-gray-300 bg-white shadow-sm rounded-lg px-4 py-2 text-sm">
            <SelectValue>
              {sortOption === "id" ? "Sort by ID" : "Sort by Name"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-lg">
            <SelectItem value="id">Sort by ID</SelectItem>
            <SelectItem value="name">Sort by Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading UI */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px] text-xl font-semibold text-gray-600">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No users found.
            </p>
          )}
        </div>
      )}

      {/* Logout & Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          Logout
        </Button>
        <Pagination />
      </div>
    </div>
  );
};

export default UsersList;
