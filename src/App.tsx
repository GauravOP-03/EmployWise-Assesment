import Login from "./components/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import UsersList from "./components/UserList";
import EditUserCard from "./components/EditUserCard";
import { UserProvider } from "./context/UserContext";
function App() {
  const RedirectComponent = () => {
    return <Navigate to="/login" />;
  };
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/users",
      element: <UsersList />,
    },
    {
      path: "/users/edit/:id",
      element: <EditUserCard />,
    },

    {
      path: "/",
      element: <RedirectComponent />,
    },
  ]);
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
