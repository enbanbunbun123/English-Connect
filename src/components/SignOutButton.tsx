import React from "react";
import { auth } from "../firebase";
import "../stylesheet/signOutButton.scss";
import { useNavigate } from "react-router-dom";

const SignOutButton: React.FC = () => {
  const navigate = useNavigate();
  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const isConfirmed = window.confirm("サインアウトしますか？");

    if (isConfirmed) {
      auth.signOut();
      navigate("/landing");
    }
  };

  return (
    <button className="SignOutButton" onClick={handleSignOut}>
      <div className="SignOutButton__title">サインアウト</div>
    </button>
  );
};

export default SignOutButton;
