import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";
import "../stylesheet/signInGuest.scss";
import { useNavigate } from "react-router-dom";

const SignInGuest: React.FC = () => {
  const navigate = useNavigate();

  const signInAsGuest = () => {
    signInAnonymously(auth)
      .then(() => {
        console.log("Signed in as a guest successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error signing in as a guest: ", error);
      });
  };

  return (
    <>
      <div className="SignInGuest" onClick={signInAsGuest}>
        <div>ゲストログイン</div>
      </div>
    </>
  );
};

export default SignInGuest;
