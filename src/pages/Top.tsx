import { auth } from "../firebase";
import "../stylesheet/top.scss";
import { useEffect, useState } from "react";
import { getDatabase, off, onValue, ref } from "firebase/database";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const Top: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const postsRef = ref(db, "posts");

    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedPosts = [];
      for (let id in data) {
        loadedPosts.push({ id, ...data[id] });
      }
      setPosts(loadedPosts);
    });

    return () => {
      off(postsRef, "value", unsubscribe);
    };
  }, []);

  const navigateToPostForm = () => {
    navigate("/post-form");
  };

  if (!auth.currentUser) return null;

  return (
    <>
      <div className="Top">
        <div className="Top__title">投稿一覧</div>
        <div className="Top__contents">
          {posts.map((post) => (
            <Card
              key={post.id}
              text={post.text}
              id={post.id}
              startData={post.startData}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <button className="Top__post-button" onClick={navigateToPostForm}>
          +
        </button>
      </div>
    </>
  );
};

export default Top;
