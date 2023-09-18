import SignInButton from "../components/SignInButton";
import Slider from "../components/Slider";
import "../stylesheet/landing.scss";

const Landing: React.FC = () => {
  return (
    <>
      <div className="Landing">
        <div className="Landing__title">Welcome to Event Search!</div>
        <Slider />
        <SignInButton />
      </div>
    </>
  );
};

export default Landing;
