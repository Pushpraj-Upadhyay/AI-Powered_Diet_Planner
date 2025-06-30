import { useState, useEffect } from "react";
import { userSignup } from "../store/slice/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadState from "../components/LoadState";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Signup successful!");
      navigate("/");
    }
    if (error) {
      toast.error("Signup failed! Please try again.");
      dispatch({ type: "auth/resetError" }); // Reset error after displaying
    }
  }, [error, isAuthenticated]);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    dispatch(userSignup(signupData));
  };

  if (loading) return <LoadState />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8"
        aria-label="Signup Section"
      >
        {/* App Branding & Heading */}
        <header className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">NutriPlan</h1>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Create Account
          </h2>
        </header>

        {/* Signup Form */}
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          aria-label="Signup Form"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-user text-gray-400"></i>
              </span>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                onChange={handleChange}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="Enter your full name"
                aria-label="Full name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-400"></i>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="Enter your email"
                aria-label="Email address"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="Enter your password"
                aria-label="Password"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="Confirm your password"
                aria-label="Confirm password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="!rounded-button w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        {/* Footer: Redirect */}
        <footer className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-500 hover:text-green-600 transition-colors"
            >
              Login now
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
};

export default SignupPage;
