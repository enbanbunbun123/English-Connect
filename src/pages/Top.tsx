import { auth } from "../firebase";
import "../stylesheet/top.scss";
import PostForm from "../components/PostForm";
import { useEffect, useState } from "react";
import { getDatabase, off, onValue, ref, set } from "firebase/database";

const Top: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

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

  if (!auth.currentUser) return null;

  return (
    <>
      <div className="Top">
        <PostForm />
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.userName}</h3>
              <p>{post.text}</p>
              <span>{post.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Top;
