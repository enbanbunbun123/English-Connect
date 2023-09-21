import { getAuth, updateProfile } from "firebase/auth";
import BackToHomeButton from "../components/BackToHomeButton";
import { useEffect, useState } from "react";
import "../stylesheet/myPage.scss";
import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import Card from "../components/Card";

interface UserPost {
  text: string;
  startData: string;
  imageUrl: string;
}

const fetchUserPosts = async (userId: string) => {
  const db = getDatabase();
  const postsRef = ref(db, "posts");
  const userPostQuery = query(
    postsRef,
    orderByChild("userId"),
    equalTo(userId)
  );
  const snapshot = await get(userPostQuery);
  if (snapshot.exists()) {
    return snapshot.val() as Record<string, UserPost>;
  } else {
    return null;
  }
};

const MyPage = () => {
  const [userPosts, setUserPosts] = useState<Record<string, UserPost> | null>(
    null
  );
  const auth = getAuth();
  const user = auth.currentUser;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ""
  );
  const [photoURL, setPhotoURL] = useState<string>(user?.photoURL || "");

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    if (!displayName.trim()) {
      window.alert("名前の入力は必須項目です。");
      return;
    }

    if (user) {
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserPosts(user.uid).then((posts) => {
        setUserPosts(posts);
      });
    }
  }, [user]);

  return (
    <>
      <BackToHomeButton />
      <div className="MyPage">
        <div className="MyPage__contents">
          <div className="MyPage__title">ユーザー情報</div>
          {isEditing ? (
            <>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="名前を入力"
              />
              <input
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="画像のURLを入力"
              />
              <button onClick={handleSave}>編集完了</button>
            </>
          ) : (
            <>
              <img src={photoURL} alt="ユーザーの写真" />
              <p>{displayName}</p>
              <button className="MyPage__contents__button" onClick={handleEdit}>
                プロフィール編集
              </button>
            </>
          )}
        </div>
        <div className="MyPage__posts">
          <div className="MyPage__posts__title">過去の投稿</div>
          <div className="MyPage__posts__contents">
            {userPosts && (
              <>
                {Object.keys(userPosts).map((key) => (
                  <Card
                    key={key}
                    id={key}
                    text={userPosts[key].text}
                    startData={userPosts[key].startData}
                    imageUrl={userPosts[key].imageUrl}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
