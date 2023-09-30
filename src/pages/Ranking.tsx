import { useEffect, useState } from "react";
import BackToHomeButton from "../components/BackToHomeButton";
import "../stylesheet/ranking.scss";
import { getDatabase, off, onValue, ref } from "firebase/database";

const Ranking: React.FC = () => {
  const [rankedPosts, setRankedPosts] = useState<any[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const likedRef = ref(db, "posts");

    const unsubscribe = onValue(likedRef, (snapshot) => {
      const data = snapshot.val();
      const loadedPosts = [];
      for (let id in data) {
        let likesCount = 0;
        if (data[id].likes) {
          likesCount = Object.keys(data[id].likes).length;
        }
        loadedPosts.push({
          id: id,
          text: data[id].text,
          likes: likesCount,
        });
      }
      loadedPosts.sort((a, b) => {
        return b.likes - a.likes;
      });
      setRankedPosts(loadedPosts);
    });

    return () => {
      off(likedRef, "value", unsubscribe);
    };
  }, []);

  return (
    <>
      <div className="Ranking">
        <BackToHomeButton />
        <div className="Ranking__contents">
          <div className="Ranking__contents__title">ランキング</div>
          <ul>
            {rankedPosts.map((post, index) => (
              <li key={post.id}>
                {index + 1}位: {post.text} {post.likes}いいね
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Ranking;
