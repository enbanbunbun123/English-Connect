import { useNavigate, useParams } from "react-router-dom";
import { getDatabase, off, onValue, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import "../stylesheet/itemDetail.scss";
import BackToHomeButton from "../components/BackToHomeButton";

const ItemDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [postUserId, setPostUserId] = useState<string | null>(null);
  const currentUserId = auth.currentUser?.uid;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editStartData, setEditStartData] = useState<string>("");
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [hasLiked, setHasLiked] = useState<boolean>(false);

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

  useEffect(() => {
    const db = getDatabase();
    const likesRef = ref(db, `posts/${id}/likes`);
    const listener = onValue(likesRef, (snapshot) => {
      const data = snapshot.val() || {};
      setLikes(data);
      if (currentUserId) {
        setHasLiked(!!data[currentUserId]);
      } else {
        setHasLiked(false);
      }
    });

    return () => {
      off(likesRef, "value", listener);
    };
  }, [id, currentUserId]);

  const handleLike = () => {
    const db = getDatabase();
    const likesRef = ref(db, `posts/${id}/likes/${currentUserId}`);
    if (hasLiked) {
      remove(likesRef);
    } else {
      set(likesRef, true);
    }
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("本当に削除しますか？");

    if (isConfirmed) {
      const db = getDatabase();
      const postRef = ref(db, `posts/${id}`);
      remove(postRef)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
    setEditText(postData?.text || "");
    setEditDescription(postData?.postDescription || "");
    setEditStartData(postData?.startData || "");
  };

  const handleSave = () => {
    if (!editText || !editStartData) {
      window.alert("イベント名と開始予定日は入力必須項目です。");
      return;
    }

    const db = getDatabase();
    const postRef = ref(db, `posts/${id}`);
    set(postRef, {
      ...postData,
      text: editText,
      postDescription: editDescription,
      startData: editStartData,
    }).then(() => {
      setIsEdit(false);
    });
  };

  return (
    <>
      <BackToHomeButton />
      <div className="ItemDetail">
        {isEdit ? (
          <>
            <textarea
              className="ItemDetail__edit__title"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="イベント名"
            />
            <textarea
              className="ItemDetail__edit__description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="投稿の説明"
            />
            <input
              className="ItemDetail__edit__startData"
              type="datetime-local"
              value={editStartData}
              onChange={(e) => setEditStartData(e.target.value)}
            />
          </>
        ) : (
          <>
            <div className="ItemDetail__contents">
              <h3>イベント名 : {postData?.text}</h3>
              <p>説明 : {postData?.postDescription}</p>
              <p className="ItemDetail__contents__user">
                投稿者 :{" "}
                <img
                  className="ItemDetail__contents__user-image"
                  src={postData?.userImage || undefined}
                  alt=""
                ></img>
                {postData?.userName}
              </p>
              <p>
                投稿日 : {new Date(postData?.timestamp || "").toLocaleString()}
              </p>
              <p>開始日 : {postData?.startData}</p>
            </div>
            <div className="ItemDetail__likes">
              <div onClick={handleLike}>
                {hasLiked ? (
                  <img src="/goodMarks/afterGood.png" alt="いいねを取り消す" />
                ) : (
                  <img src="/goodMarks/beforeGood.png" alt="いいね" />
                )}
              </div>
              <span>{Object.keys(likes).length} いいね</span>
            </div>
          </>
        )}
        {currentUserId === postUserId && (
          <>
            {isEdit ? (
              <button className="ItemDetail__button" onClick={handleSave}>
                変更を保存する
              </button>
            ) : (
              <button className="ItemDetail__button" onClick={handleEdit}>
                投稿を編集する
              </button>
            )}
            <button className="ItemDetail__button" onClick={handleDelete}>
              投稿を削除する
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ItemDetail;
