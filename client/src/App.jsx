import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import CreateMealPlan from "./pages/CreateMealPlan";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import DietStructure from "./pages/DietStructure";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/meal-plan",
    children: [
      {
        path: "/meal-plan/create",
        element: (
          <ProtectedRoutes>
            <CreateMealPlan />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/meal-plan/suggestions",
        element: (
          <ProtectedRoutes>
            <DietStructure />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
