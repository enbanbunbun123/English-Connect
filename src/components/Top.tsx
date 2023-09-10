import { auth } from "../firebase";
import SignOutButton from "./SignOutButton ";
import "../stylesheet/top.scss";

const Top: React.FC = () => {
  if (!auth.currentUser) return null;

  return (
    <>
      <div className="Top">
        <div className="Top__userInfo">
          <img src={auth.currentUser.photoURL || undefined} alt=""></img>
          <p>{auth.currentUser.displayName}</p>
        </div>
        <SignOutButton />
      </div>
    </>
  );
};

export default Top;
