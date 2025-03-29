import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { updateUser } from "@/services/api";

const EditUserCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // context api
  const { editedUsers, setEditedUsers, users, setUsers } = useUser();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(() => {
    const existingUser = users.find((u) => u.id === Number(id));
    return existingUser ? { ...existingUser } : editedUsers[Number(id)] || null;
  });

  // find user through params
  useEffect(() => {
    const foundUser = users.find((u) => u.id === Number(id));
    if (!foundUser) {
      navigate("/users");
      const toastId = toast.error("User not found!", {
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(toastId),
        },
      });
    } else {
      setUser({ ...foundUser });
    }
  }, [id, users, navigate]);

  if (!user) return null;

  // store the input while changing the edit
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser!,
      [e.target.name]: e.target.value,
    }));
  };

  // submit edit 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // changing data in api
      await updateUser(id, user);

      // changing locally
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === Number(id) ? user : u))
      );

      // changing in context api
      setEditedUsers((prevEdited) => ({
        ...prevEdited,
        [Number(id)]: user,
      }));

      navigate("/users");
      const toastId = toast.success("User updated successfully!", {
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(toastId),
        },
      });

    } catch (error) {
      console.error(error);
      const toastId = toast.error("Failed to update user", {
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(toastId),
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen flex items-center justify-center p-8">
      <Card className="p-6 shadow-lg rounded-2xl w-full border bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Edit User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col items-center space-y-3">
              <img
                src={user.avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border border-gray-300 shadow-md"
              />
              <Input
                type="text"
                name="avatar"
                value={user.avatar}
                onChange={handleChange}
                placeholder="Enter avatar image URL"
                className="w-full"
                required
              />
            </div>
            <Input
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full"
              required
            />
            <Input
              name="last_name"
              type="text"
              value={user.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full"
              required
            />
            <Input
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full"
              required
            />
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => navigate("/users")}
                variant="outline"
                className="w-1/3"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-1/3">
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUserCard;
