import { auth } from "../firebase";
import "../stylesheet/signOutButton.scss";

const SignOutButton: React.FC = () => {
  const handleSignOut = () => {
    const isConfirmed = window.confirm("サインアウトしますか？");

    if (isConfirmed) {
      auth.signOut();
    }
  };

  return (
    <button className="SignOutButton" onClick={handleSignOut}>
      サインアウト
    </button>
  );
};

export default SignOutButton;
