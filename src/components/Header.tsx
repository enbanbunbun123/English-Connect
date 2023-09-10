import React from "react";
import { auth } from "../firebase";
import "../stylesheet/header.scss";

const Header: React.FC = () => {
  if (!auth.currentUser) return null;

  return (
    <>
      <div className="Header">
        <div className="Header__user-info">
          <img src={auth.currentUser.photoURL || undefined} alt=""></img>
          <p>{auth.currentUser.displayName}</p>
        </div>
      </div>
    </>
  );
};

export default Header;
