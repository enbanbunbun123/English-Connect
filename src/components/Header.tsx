import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import "../stylesheet/header.scss";
import SignOutButton from "./SignOutButton";
import { Link } from "react-router-dom";
import { User } from "firebase/auth";

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
          <div className="Header__icon">
            <Link to={`/`}>
              <img
                className="Header__icon__image"
                src="/icons/icon.png"
                alt="EVENT SEARCH"
              ></img>
            </Link>
          </div>
          {user && (
            <>
              <Link className="Header__left__menu" to={`/`}>
                <div>Top</div>
              </Link>
              {!user.isAnonymous && (
                <Link
                  className="Header__left__menu"
                  to={`/my-page/${user.uid}`}
                >
                  <div>マイページ</div>
                </Link>
              )}
              {/* <Link className="Header__left__menu" to={`/ranking`}>
                <div>ランキング</div>
              </Link> */}
            </>
          )}
        </div>
        <div className="Header__right">
          <div className="Header__signOut-button">
            <SignOutButton />
          </div>
          {user && !user.isAnonymous && (
            <>
              <Link to={`/my-page/${user.uid}`}>
                <div className="Header__right__user-info">
                  <img src={user.photoURL || undefined} alt=""></img>
                </div>
              </Link>
            </>
          )}
          <div className="Header__hamburger-menu" onClick={toggleMenu}>
            ☰
          </div>
        </div>
        {isOpen && (
          <div className="Header__modal-menu">
            {user && (
              <>
                {user && !user.isAnonymous && (
                  <>
                    <Link
                      to={`/my-page/${user.uid}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="Header__modal-menu__user-info">
                        <img src={user.photoURL || undefined} alt=""></img>
                      </div>
                    </Link>
                  </>
                )}
                <Link
                  className="Header__modal-menu__menu"
                  to={`/`}
                  onClick={() => setIsOpen(false)}
                >
                  <div>Top</div>
                </Link>
                {!user.isAnonymous && (
                  <Link
                    className="Header__modal-menu__menu"
                    to={`/my-page/${user.uid}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div>マイページ</div>
                  </Link>
                )}
                {/* <Link
                  className="Header__modal-menu__menu"
                  to={`/ranking`}
                  onClick={() => setIsOpen(false)}
                >
                  <div>ランキング</div>
                </Link> */}
                <SignOutButton />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
