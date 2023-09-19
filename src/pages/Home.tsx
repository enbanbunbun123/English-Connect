import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../stylesheet/home.scss";
import Top from "./Top";
import Landing from "./Landing";

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div className="home">
      {user ? (
        <>
          <Top />
        </>
      ) : (
        <Landing />
      )}
    </div>
  );
}

export default Home;
