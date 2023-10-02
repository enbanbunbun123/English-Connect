import SignInButton from "../components/SignInButton";
import "../stylesheet/signIn.scss";

export const SignIn = () => {
  return (
    <>
      <div className="SignIn">
        <div className="SignIn__title">EVENT SEARCHへようこそ！</div>
        <SignInButton />
      </div>
    </>
  );
};

export default SignIn;
