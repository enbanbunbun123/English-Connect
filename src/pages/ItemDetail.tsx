import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { getDatabase, off, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const ItemDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [postUserId, setPostUserId] = useState<string | null>(null);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const db = getDatabase();
    const postRef = ref(db, `posts/${id}`);
    const listener = onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      setPostUserId(data?.userId || null);
    });

    return () => {
      off(postRef, "value", listener);
    };
  }, [id]);

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
      {currentUserId === postUserId && (
        <button onClick={handleDelete}>削除</button>
      )}
    </>
  );
};

export default ItemDetail;
