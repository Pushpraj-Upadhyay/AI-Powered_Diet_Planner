import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/slice/auth/authActions";
import { toast } from "react-toastify";
import LoadState from "../components/LoadState";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful!");
      navigate("/");
    }
    if (error) {
      toast.error("Invalid email or password!");
      dispatch({ type: "auth/resetError" }); // Reset error after displaying
    }
  }, [error, isAuthenticated]);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("email", loginData.email);
      localStorage.setItem("password", loginData.password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    dispatch(userLogin(loginData));
  };

  if (loading) return <LoadState />;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8"
        aria-label="Login Section"
      >
        <header className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">NutriPlan</h1>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Sign in to your account
          </h2>
        </header>

        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          aria-label="Login Form"
        >
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-green-500 hover:text-green-600 transition-colors"
            >
              Forgot your password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="!rounded-button w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className="!rounded-button flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            aria-label="Continue with Google"
          >
            <i className="fab fa-google text-red-500 mr-2"></i>Google
          </button>
          <button
            className="!rounded-button flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            aria-label="Continue with Apple"
          >
            <i className="fab fa-apple text-gray-900 mr-2"></i>Apple
          </button>
        </div>

        {/* Sign Up Redirect */}
        <footer className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-green-500 hover:text-green-600 transition-colors"
            >
              Sign up now
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
};

export default LoginPage;
