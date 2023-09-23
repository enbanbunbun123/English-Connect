import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";

const SignInGuest: React.FC = () => {
  const signInAsGuest = () => {
    signInAnonymously(auth)
      .then(() => {
        console.log("Signed in as a guest successfully");
      })
      .catch((error) => {
        console.log("Error signing in as a guest: ", error);
      });
  };

  return (
    <>
      <div className="SignInGuest" onClick={signInAsGuest}>
        <button>ゲストログイン（閲覧用）</button>
      </div>
    </>
  );
};

export default SignInGuest;
