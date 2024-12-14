import React from "react";

const Navigation = () => {
  return (
    <NavStyled>
      <div className="user-con">
        <img src={"../../img/avatar.jpg"} alt="avatar" />
        <div className="text">
          <h2>Mike</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items"></ul>
    </NavStyled>
  );
};

const NavStyled = styled.nav``;

export default Navigation;
