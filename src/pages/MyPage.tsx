import { getAuth, updateProfile } from "firebase/auth";
import BackToHomeButton from "../components/BackToHomeButton";
import { useState } from "react";
import "../stylesheet/myPage.scss";

const MyPage = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ""
  );
  const [photoURL, setPhotoURL] = useState<string>(user?.photoURL || "");

  const handleEdit = () => [setIsEditing(true)];

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
      </div>
    </>
  );
};

export default MyPage;
