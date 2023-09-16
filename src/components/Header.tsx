import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import "../stylesheet/header.scss";
import SignOutButton from "./SignOutButton";
import { User } from "firebase/auth";

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>loading...</div>;
  if (!auth.currentUser) return null;

  return (
    <>
      <div className="Header">
        <SignOutButton />
        {user && (
          <div className="Header__user-info">
            <img src={user.photoURL || undefined} alt=""></img>
            <p>{user.displayName}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
