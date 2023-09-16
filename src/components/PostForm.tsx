import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import { app, auth } from "../firebase";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "../stylesheet/postForm.scss";

const PostForm = () => {
  const [postText, setPostText] = useState("");
  const [postDescription, setpostDescription] = useState("");
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
      postDescription: postDescription,
    });
    setPostText("");
    setStartData("");
    setpostDescription("");
    navigate("/");
  };

  const navigateToTop = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="PostForm">
        <button className="PostForm__back-button" onClick={navigateToTop}>
          ＜
        </button>
        <div className="PostForm__contents">
          <textarea
            className="PostForm__contents__title"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="投稿内容"
          />
          <textarea
            className="PostForm__contents__description"
            value={postDescription}
            onChange={(e) => setpostDescription(e.target.value)}
            placeholder="投稿の説明"
          />
          <label className="PostForm__contents__data">
            <div>開始日 :</div>
            <input
              type="datetime-local"
              value={startData}
              onChange={(e) => setStartData(e.target.value)}
            />
          </label>
          <button onClick={handlePost}>投稿</button>
        </div>
      </div>
    </>
  );
};

export default PostForm;
