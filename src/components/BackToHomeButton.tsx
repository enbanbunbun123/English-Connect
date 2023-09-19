import { useNavigate } from "react-router-dom";
import "../stylesheet/backToHomeButton.scss";

const BackToHomeButton = () => {
  const navigate = useNavigate();

  const navigateToTop = () => {
    navigate("/");
  };

  return (
    <>
      <button className="BackToHomeButton" onClick={navigateToTop}>
        ＜
      </button>
    </>
  );
};

export default BackToHomeButton;
