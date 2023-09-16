import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import { app, auth } from "../firebase";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "../stylesheet/postForm.scss";

const PostForm = () => {
  const [postText, setPostText] = useState("");
  const userId = auth.currentUser?.uid;
  const userName = auth.currentUser?.displayName;
  const userImage = auth.currentUser?.photoURL;
  const timestamp = new Date().toISOString();
  const [startData, setStartData] = useState<string>("");
  const navigate = useNavigate();

  if (!userId) {
    console.error("サインインしていません");
  }

  const handlePost = () => {
    if (!postText || !startData) {
      window.alert("投稿内容と開始予定日は入力必須項目です。");
      return;
    }

    const db = getDatabase(app);
    const postRef = ref(db, "posts");
    const newPostRef = push(postRef);
    set(newPostRef, {
      userId: userId,
      userName: userName,
      userImage: userImage,
      text: postText,
      timestamp: timestamp,
      startData: startData,
    });
    setPostText("");
    setStartData("");
    navigate("/");
  };

  const navigateToTop = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <div>
        <button className="PostForm__back-button" onClick={navigateToTop}>
          ＜
        </button>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="投稿内容"
        />
        <label>
          <input
            type="date"
            value={startData}
            onChange={(e) => setStartData(e.target.value)}
          />
        </label>
        <button onClick={handlePost}>投稿</button>
      </div>
    </>
  );
};

export default PostForm;
