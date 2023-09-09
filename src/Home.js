import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <>
          <UserInfo />
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}

export default Home;

function SignInButton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Googleでサインイン</button>;
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Googleでサインアウト</button>;
}

function UserInfo() {
  return (
    <div className="UserInfo">
      <img src={auth.currentUser.photoURL} alt=""></img>
      <p>{auth.currentUser.displayName}</p>
    </div>
  );
}
