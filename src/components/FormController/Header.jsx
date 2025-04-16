import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleUserLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAdminLogout=()=>{
    localStorage.removeItem("adminToken");
    navigate("/admin/login")
  }

  return (
    <div className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
        <div className="text-xl font-extrabold bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 text-transparent bg-clip-text ">
            Expense Tracker
          </div>
          {localStorage.getItem('user')?(
            <button
            onClick={handleUserLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded-md text-sm sm:text-base transition duration-300 shadow-md"
          >
            Logout
          </button>

          ):localStorage.getItem("adminToken") ? (
            <button
            onClick={handleAdminLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded-md text-sm sm:text-base transition duration-300 shadow-md"
          >
            Logout
          </button>
          ):null}
          
        </div>
      </div>
    </div>
  );
};

export default Header;
