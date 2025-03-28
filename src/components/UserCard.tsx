import { useState } from "react";
// import EditUserModal from "./EditUserModal";
// import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { User } from "@/types";
import { deleteUser } from "@/api";
const UserCard = ({ user }: { user: User }) => {
  const [loadingDeletedUser, setLoadingDeletedUser] = useState(false);
  const navigate = useNavigate();

  const { setUsers, setDeletedUsers } = useUser();

  const handleDelete = async () => {
    try {
      setLoadingDeletedUser(true);
      await deleteUser(user.id);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      setDeletedUsers((prevDeleted) => [...prevDeleted, user.id]);

      setLoadingDeletedUser(false);
      toast("User deleted");
    } catch (e) {
      console.error(e);
      toast("Error deleting user");

      setLoadingDeletedUser(false);
    }
  };

  function onEditClick() {
    navigate(`./edit/${user.id}`);
  }

  return (
    <Card className="p-4 shadow-lg rounded-2xl w-full max-w-sm">
      <CardHeader className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.first_name} />
        </Avatar>
        <CardTitle>
          {user.first_name} {user.last_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onEditClick}>
            Edit
          </Button>
          <Button
            variant="destructive"
            disabled={loadingDeletedUser}
            onClick={handleDelete}
          >
            {loadingDeletedUser ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardContent>
      {/* {isEditing && <EditUserModal user={user} setUsers={setUsers} close={() => setIsEditing(false)} />} */}
    </Card>
  );
};

export default UserCard;
