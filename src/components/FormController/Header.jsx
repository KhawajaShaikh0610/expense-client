import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleUserLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-blue-600">Expense Tracker</div>
          {localStorage.getItem('user')?(
            <div
            onClick={handleUserLogout}
            className="text-gray-700 hover:text-red-600 font-medium cursor-pointer transition duration-200 text-sm sm:text-base"
          >
            Logout
          </div>
          ):null}
          
        </div>
      </div>
    </div>
  );
};

export default Header;
