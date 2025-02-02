import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleUserLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div>
      <div className="header-set">
        <div className="header-logo">
          <div>LOGO</div>
          <div onClick={handleUserLogout} className="cursor-pointer">
            logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
