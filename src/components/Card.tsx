import "../stylesheet/card.scss";

type CardProps = {
  userName: string;
  text: string;
  timestamp: string;
  userId: string;
  currentUserId: string | undefined;
  onDelete: (postId: string) => void;
  id: string;
};

const Card: React.FC<CardProps> = ({
  userName,
  text,
  timestamp,
  userId,
  currentUserId,
  onDelete,
  id,
}) => {
  return (
    <>
      <div className="card">
        <h3 className="card__title">{userName}</h3>
        <p className="card__text">{text}</p>
        <span>{new Date(timestamp).toLocaleString()}</span>
        {currentUserId === userId && (
          <button onClick={() => onDelete(id)}>削除</button>
        )}
      </div>
    </>
  );
};

export default Card;
