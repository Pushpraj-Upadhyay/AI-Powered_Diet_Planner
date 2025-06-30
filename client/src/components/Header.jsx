import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../store/slice/auth/authActions";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <nav className="w-full bg-white shadow-lg transform-gpu sticky top-0">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <i className="fas fa-leaf text-3xl text-green-500"></i>
          <span className="text-3xl font-bold text-gray-800">NutriPlan</span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-lg">
          <Link
            to="/"
            className="text-gray-600 hover:text-green-500 transition-colors cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="/meal-plan/create"
            className="text-gray-600 hover:text-green-500 transition-colors cursor-pointer"
          >
            Create Plan
          </Link>
          <Link
            to="/meal-plan/suggestions"
            className="text-gray-600 hover:text-green-500 transition-colors cursor-pointer"
          >
            Diet
          </Link>
          <a
            href="#"
            className="text-gray-600 hover:text-green-500 transition-colors cursor-pointer"
          >
            Progress
          </a>
        </div>

        {!isAuthenticated && (
          <Link
            to="/login"
            className="!rounded-button bg-green-500 text-white px-6 py-2 hover:bg-green-600 transition-colors transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            Sign In
          </Link>
        )}

        {isAuthenticated && (
          <div className="relative" ref={menuRef}>
            {/* Menu icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl rounded-full"
            >
              <FaRegUserCircle className="h-10 w-10 text-gray-500 hover:text-green-600 transition-colors " />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 transition-all duration-200 origin-top-right transform ${
                isOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Your Profile
              </Link>
              <Link
                to="/meal-plan/create"
                className="md:hidden block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Create Plan
              </Link>
              <Link
                to="/meal-plan/suggestions"
                className="md:hidden block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Active Plan
              </Link>
              <a
                href="/progress"
                className="md:hidden block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
              >
                Progress
              </a>
              <button
                onClick={() => {
                  dispatch(userLogout());
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
