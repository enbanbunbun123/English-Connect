import React from "react";
import { auth } from "../firebase";
import "../stylesheet/header.scss";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  if (!auth.currentUser) return null;

  return (
    <>
      <div className="Header">
        <div className="Header__user-info">
          <img src={auth.currentUser.photoURL || undefined} alt=""></img>
        </div>
      </div>
    </>
  );
};

export default Header;
