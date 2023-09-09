import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../components/Header";

function SignInButton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Googleでサインイン</button>;
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>サインアウト</button>;
}

function UserInfo() {
  if (!auth.currentUser) return null;

  return (
    <div className="UserInfo">
      <img src={auth.currentUser.photoURL || undefined} alt=""></img>
      <p>{auth.currentUser.displayName}</p>
    </div>
  );
}

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <>
          <Header />
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
