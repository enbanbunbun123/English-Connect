import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../stylesheet/home.scss";
import Header from "../components/Header";
import Top from "./Top";
import Landing from "./Landing";

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
        <Landing />
      )}
    </div>
  );
}

export default Home;
