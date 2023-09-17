import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { getDatabase, off, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import "../stylesheet/itemDetail.scss";

const ItemDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [postUserId, setPostUserId] = useState<string | null>(null);
  const currentUserId = auth.currentUser?.uid;

  const [postData, setPostData] = useState<{
    userId?: string;
    userName?: string;
    userImage?: string;
    text?: string;
    timestamp?: string;
    startData?: string;
    postDescription?: string;
  } | null>(null);

  useEffect(() => {
    const db = getDatabase();
    const postRef = ref(db, `posts/${id}`);
    const listener = onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      setPostData(data);
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
      <div className="ItemDetail__contents">
        <h3>{postData?.text}</h3>
        <p>説明: {postData?.postDescription}</p>
        <p>投稿者: {postData?.userName}</p>
        <p>作成日: {new Date(postData?.timestamp || "").toLocaleString()}</p>
        <p>開始日: {postData?.startData}</p>
      </div>
      {currentUserId === postUserId && (
        <button onClick={handleDelete}>削除</button>
      )}
    </>
  );
};

export default ItemDetail;
