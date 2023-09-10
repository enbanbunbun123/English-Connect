import SignInButton from "../components/SignInButton";
import "../stylesheet/landing.scss";

const Landing: React.FC = () => {
  return (
    <>
      <div className="Landing">
        <div className="Landing__title">Welcome to my site!</div>
        <SignInButton />
      </div>
    </>
  );
};

export default Landing;
