import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../stylesheet/home.scss";
import Header from "../components/Header";
import Top from "../components/Top";

function SignInButton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Googleでサインイン</button>;
}

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div className="home">
      {user ? (
        <>
          <Header />
          <Top />
        </>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}

export default Home;
