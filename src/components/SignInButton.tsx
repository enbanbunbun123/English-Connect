import { signInWithPopup } from "firebase/auth";
import { app, auth, provider } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import "../stylesheet/signInButton.scss";

const SignInButton: React.FC = () => {
  const signInWithGoogle = () => {
    const db = getDatabase(app);

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const uid = user.uid;
        const email = user.email;

        const userRef = ref(db, "users/" + uid);
        set(userRef, {
          id: uid,
          gmail: email,
        });
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
      });
  };

  return (
    <button className="SignInButton" onClick={signInWithGoogle}>
      Googleでサインイン
    </button>
  );
};

export default SignInButton;
