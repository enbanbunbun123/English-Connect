import React from "react";
import { auth } from "../firebase";
import "../stylesheet/signOutButton.scss";

const SignOutButton: React.FC = () => {
  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const isConfirmed = window.confirm("サインアウトしますか？");

    if (isConfirmed) {
      auth.signOut();
    }
  };

  return (
    <button className="SignOutButton" onClick={handleSignOut}>
      <div className="SignOutButton__title">サインアウト</div>
    </button>
  );
};

export default SignOutButton;
