import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ItemDetail: React.FC = () => {
  const navigate = useNavigate();

  const navigateToTop = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <button className="PostForm__back-button" onClick={navigateToTop}>
        ＜
      </button>
    </>
  );
};

export default ItemDetail;
