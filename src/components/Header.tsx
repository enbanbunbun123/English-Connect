import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import "../stylesheet/header.scss";
import SignOutButton from "./SignOutButton";
import { User } from "firebase/auth";
import { Link } from "react-router-dom";

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
        <div className="Header__left">
          {user && (
            <>
              <Link to={`/my-page/${user.uid}`}>
                <div className="Header__left__user-info">My Page</div>
              </Link>
            </>
          )}
        </div>
        <div className="Header__right">
          <SignOutButton />
          {user && (
            <>
              <div className="Header__right__user-info">
                <img src={user.photoURL || undefined} alt=""></img>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
