import { auth } from "../firebase";
import "../stylesheet/SignOutButton.scss";

const SignOutButton: React.FC = () => {
  return (
    <button className="SignOutButton" onClick={() => auth.signOut()}>
      サインアウト
    </button>
  );
};

export default SignOutButton;
