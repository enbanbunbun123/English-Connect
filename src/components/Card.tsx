import { useNavigate } from "react-router-dom";
import "../stylesheet/card.scss";
import { useEffect, useState } from "react";

type CardProps = {
  userName: string;
  text: string;
  timestamp: string;
  id: string;
  startData: string;
  imageUrl?: string;
};

const Card: React.FC<CardProps> = ({
  userName,
  text,
  timestamp,
  id,
  startData,
  imageUrl,
}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const startTime = new Date(startData).getTime();
    const updateCountDown = () => {
      const now = new Date().getTime();
      const distance = startTime - now;
      setTimeLeft(distance);
    };

    updateCountDown();
    const interval = setInterval(updateCountDown, 1000);

    return () => clearInterval(interval);
  }, [startData]);

  const navigateToItemDetail = () => {
    navigate(`/item-detail/${id}`);
  };

  const formatTimeLeft = () => {
    if (timeLeft < 0) return "イベント終了";

    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `開始まで ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <div className="card" onClick={navigateToItemDetail}>
        <img src={imageUrl} alt=""></img>
        <h3 className="card__title">{text}</h3>
        <p className="card__text">{userName}</p>
        <div>作成日 : {new Date(timestamp).toLocaleString()}</div>
        <div>{formatTimeLeft()}</div>
      </div>
    </>
  );
};

export default Card;
