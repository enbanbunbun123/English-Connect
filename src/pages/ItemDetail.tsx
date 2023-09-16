import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { getDatabase, ref, remove } from "firebase/database";

const ItemDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const navigateToTop = () => {
    navigate("/");
  };

  const handleDelete = () => {
    const db = getDatabase();
    const postRef = ref(db, `posts/${id}`);
    remove(postRef)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <>
      <Header />
      <button className="PostForm__back-button" onClick={navigateToTop}>
        ＜
      </button>
      <button onClick={handleDelete}>削除</button>
    </>
  );
};

export default ItemDetail;
