import { useNavigate } from "react-router-dom";
import "../stylesheet/card.scss";

type CardProps = {
  userName: string;
  text: string;
  timestamp: string;
  id: string;
  startData: string;
};

const Card: React.FC<CardProps> = ({
  userName,
  text,
  timestamp,
  id,
  startData,
}) => {
  const navigate = useNavigate();

  const navigateToItemDetail = () => {
    navigate(`/item-detail/${id}`);
  };

  return (
    <>
      <div className="card" onClick={navigateToItemDetail}>
        <h3 className="card__title">{text}</h3>
        <p className="card__text">{userName}</p>
        <div>作成日 : {new Date(timestamp).toLocaleString()}</div>
        <div>開始日 : {startData}</div>
      </div>
    </>
  );
};

export default Card;
