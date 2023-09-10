import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "../stylesheet/signInButton.scss";

const SignInButton: React.FC = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <button className="SignInButton" onClick={signInWithGoogle}>
      Googleでサインイン
    </button>
  );
};

export default SignInButton;
