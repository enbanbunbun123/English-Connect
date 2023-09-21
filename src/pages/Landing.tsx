import SignInButton from "../components/SignInButton";
// import Slider from "../components/Slider";
import "../stylesheet/landing.scss";

const Landing: React.FC = () => {
  return (
    <>
      <div className="Landing">
        <div className="Landing__wrapper">
          <img className="Landing__image" src="images/event2.jpg" alt=""></img>
          {/* <Slider /> */}
          <div className="Landing__overlay">
            <div className="Landing__text">
              <div className="Landing__text__title">
                Event Search へようこそ！
              </div>
              <div className="Landing__text__contents">
                PC,スマートフォンでいつでもどこでも全国のイベントを投稿・検索できます。あなたも始めてみませんか？
              </div>
            </div>
            <SignInButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
