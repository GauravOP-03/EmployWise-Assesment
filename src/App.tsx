import Login from "./components/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import UsersList from "./components/UserList";
import EditUserCard from "./components/EditUserCard";
import { UserProvider } from "./context/UserContext";
import Error from "./components/Error";


function App() {
  // redirect request / to login 
  const RedirectComponent = () => {
    return <Navigate to="/login" />;
  };

  // creating routes
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
    {
      path: "*",
      element: <Error />
    }
  ]);
  return (
    // wrapped in context provider
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
