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
          <div className="Ranking__contents__description">
            過去の投稿の中でいいねの数が多い投稿がランキング形式で表示されます。
          </div>
          <div className="Ranking__contents__content">
            <ul>
              {rankedPosts.map((post, index) => (
                <li key={post.id}>
                  <div className="Ranking__contents__post">
                    <div className="Ranking__contents__post__bar"></div>
                    <div className="Ranking__contents__post__rank">
                      <span>
                        {index + 1}位: {post.text}{" "}
                      </span>
                      <span>{post.likes}いいね</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ranking;
