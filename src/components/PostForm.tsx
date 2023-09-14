import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import { app, auth } from "../firebase";

const PostForm = () => {
  const [postText, setPostText] = useState("");
  const userId = auth.currentUser?.uid;
  const userName = auth.currentUser?.displayName;
  const userImage = auth.currentUser?.photoURL;
  const timestamp = new Date().toISOString();

  if (!userId) {
    console.error("サインインしていません");
  }

  const handlePost = () => {
    const db = getDatabase(app);
    const postRef = ref(db, "posts");
    const newPostRef = push(postRef);
    set(newPostRef, {
      userId: userId,
      userName: userName,
      userImage: userImage,
      text: postText,
      timestamp: timestamp,
    });
    setPostText("");
  };

  return (
    <>
      <div>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="投稿内容"
        />
        <button onClick={handlePost}>投稿</button>
      </div>
    </>
  );
};

export default PostForm;
